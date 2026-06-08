import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "ඉතාමත් විශ්වාසදායක සේවාවක්. අපේ ඉඩම් ගනුදෙනුව ඉතා සාර්ථකව සිදු කරගත හැකි විය.",
    by: "කමල් පෙරේරා, CEO at Perera Holdings, කොළඹ",
    imgSrc: "https://ui-avatars.com/api/?name=Kamal+Perera&background=44614A&color=fff&size=150&bold=true&font-size=0.4"
  },
  {
    tempId: 1,
    testimonial: "Property valuation was spot on and the team guided us every step of the way.",
    by: "Nimal Silva, Director at Silva Constructions, ගම්පහ",
    imgSrc: "https://ui-avatars.com/api/?name=Nimal+Silva&background=2d4934&color=fff&size=150&bold=true&font-size=0.4"
  },
  {
    tempId: 2,
    testimonial: "කොළඹ නගරයේ නිවසක් සොයා ගැනීම ඉතා අපහසු කාර්යයක්. මෙම සේවාව හරහා පහසුවෙන් ඉෂ්ට සිද්ධ විය.",
    by: "සුනිල් ජයවර්ධන, CFO at Lanka Finance, නුගේගොඩ",
    imgSrc: "https://ui-avatars.com/api/?name=Sunil+Jayawardena&background=1c3d24&color=fff&size=150&bold=true&font-size=0.4"
  },
  {
    tempId: 3,
    testimonial: "Exceptional service from start to finish. Found our commercial property within two weeks.",
    by: "Priya Fernando, COO at Fernando Group, මාතර",
    imgSrc: "https://ui-avatars.com/api/?name=Priya+Fernando&background=44614A&color=fff&size=150&bold=true&font-size=0.4"
  },
  {
    tempId: 4,
    testimonial: "අපගේ ආයෝජනය ඉතා ඵලදායී ලෙස කළමනාකරණය කරන ලදී. ස්තූතියි!",
    by: "රංජිත් විජේසිංහ, MD at Wijesinghe Estates, කළුතර",
    imgSrc: "https://ui-avatars.com/api/?name=Ranjith+Wijesinghe&background=2d4934&color=fff&size=150&bold=true&font-size=0.4"
  },
  {
    tempId: 5,
    testimonial: "Professional team with deep knowledge of the Sri Lankan property market. Highly recommended.",
    by: "Chaminda Rajapaksa, CTO at Digital Lanka, රාජගිරිය",
    imgSrc: "https://ui-avatars.com/api/?name=Chaminda+Rajapaksa&background=1c3d24&color=fff&size=150&bold=true&font-size=0.4"
  },
  {
    tempId: 6,
    testimonial: "කන්දේ ඉඩමක් මිලදී ගැනීමට සිතුවෙමි. ඔවුන් නුවර ප්‍රදේශයෙන් හොඳ ඉඩමක් සොයා දුන්නා.",
    by: "දිල්රුක්ෂි කුමාරි, Entrepreneur, කන්දි",
    imgSrc: "https://ui-avatars.com/api/?name=Dilrukshi+Kumari&background=44614A&color=fff&size=150&bold=true&font-size=0.4"
  },
  {
    tempId: 7,
    testimonial: "Best investment decision I made. The Colombo apartment has appreciated 40% in three years.",
    by: "Asanka Gunasekara, Finance Manager at BOC, කොළඹ 03",
    imgSrc: "https://ui-avatars.com/api/?name=Asanka+Gunasekara&background=2d4934&color=fff&size=150&bold=true&font-size=0.4"
  },
  {
    tempId: 8,
    testimonial: "දකුණු පළාතේ ව්‍යාපාරික ස්ථානයක් සොයමින් සිටියෙමි. ඉතා හොඳ ස්ථානයක් ලබා දුන්නා.",
    by: "සමන් හේරත්, Business Owner, ගාල්ල",
    imgSrc: "https://ui-avatars.com/api/?name=Saman+Herath&background=1c3d24&color=fff&size=150&bold=true&font-size=0.4"
  },
  {
    tempId: 9,
    testimonial: "Transparent process with no hidden charges. The team was honest and very supportive.",
    by: "Tharushi Wickramasinghe, HR Director at MAS Holdings, බියගම",
    imgSrc: "https://ui-avatars.com/api/?name=Tharushi+Wickramasinghe&background=44614A&color=fff&size=150&bold=true&font-size=0.4"
  },
  {
    tempId: 10,
    testimonial: "මගේ පවුලට නිවසක් ලබා ගැනීමේ සිහිනය සැබෑ කර ගැනීමට ඔවුන් උදවු කළා.",
    by: "කුසුම් රත්නායක, Teacher, පානදුර",
    imgSrc: "https://ui-avatars.com/api/?name=Kusum+Rathnayake&background=2d4934&color=fff&size=150&bold=true&font-size=0.4"
  },
  {
    tempId: 11,
    testimonial: "Smooth transaction from viewing to handing over keys. No stress at all.",
    by: "Lahiru Dissanayake, Software Engineer at WSO2, මාලඹේ",
    imgSrc: "https://ui-avatars.com/api/?name=Lahiru+Dissanayake&background=1c3d24&color=fff&size=150&bold=true&font-size=0.4"
  },
  {
    tempId: 12,
    testimonial: "උතුරු පළාතේ ඉඩම් ගැන විශේෂ දැනුමක් ඇති කණ්ඩායමක්. ඉතා ප්‍රයෝජනවත් විය.",
    by: "ජනක් කුමාරසිංහ, Architect, යාපනය",
    imgSrc: "https://ui-avatars.com/api/?name=Janak+Kumarasinghe&background=44614A&color=fff&size=150&bold=true&font-size=0.4"
  },
  {
    tempId: 13,
    testimonial: "The legal paperwork was handled flawlessly. Peace of mind throughout the process.",
    by: "Sanduni Amarasinghe, Lawyer at Supreme Court, කොළඹ 12",
    imgSrc: "https://ui-avatars.com/api/?name=Sanduni+Amarasinghe&background=2d4934&color=fff&size=150&bold=true&font-size=0.4"
  },
  {
    tempId: 14,
    testimonial: "හොඳ ප්‍රදේශවල ඉඩම් ගැන නිවැරදි තොරතුරු ලබා දෙනවා. විශ්වාසදායකයි.",
    by: "මලිත් ප්‍රනාන්දු, Civil Engineer, නෙගොඹො",
    imgSrc: "https://ui-avatars.com/api/?name=Malith+Fernando&background=1c3d24&color=fff&size=150&bold=true&font-size=0.4"
  },
  {
    tempId: 15,
    testimonial: "Invested in a land plot in Kandy through them. Already seeing great returns.",
    by: "Roshan Bandara, Doctor at Kandy Hospital, මහනුවර",
    imgSrc: "https://ui-avatars.com/api/?name=Roshan+Bandara&background=44614A&color=fff&size=150&bold=true&font-size=0.4"
  },
  {
    tempId: 16,
    testimonial: "අංශු මාත්‍රයක් වත් ගැටලුවක් නොමැතිව ගනුදෙනුව නිිම කළා. ඉතා සතුටුදායකයි.",
    by: "නදීශා සේනාරත්න, Marketing Manager, රත්මලාන",
    imgSrc: "https://ui-avatars.com/api/?name=Nadeesha+Senaratne&background=2d4934&color=fff&size=150&bold=true&font-size=0.4"
  },
  {
    tempId: 17,
    testimonial: "Great after-sale support too. They helped us with everything even after handover.",
    by: "Kasun Liyanage, Entrepreneur at Liyanage Group, හෝමාගම",
    imgSrc: "https://ui-avatars.com/api/?name=Kasun+Liyanage&background=1c3d24&color=fff&size=150&bold=true&font-size=0.4"
  },
  {
    tempId: 18,
    testimonial: "බස්නාහිර පළාතේ නිවාස ව්‍යාපෘතිය ගැන ඔවුන්ගේ උපදෙස් ඉතා වටිනාකමින් යුතු විය.",
    by: "අනුර දිසානායක, Property Developer, කඩවත",
    imgSrc: "https://ui-avatars.com/api/?name=Anura+Dissanayake&background=44614A&color=fff&size=150&bold=true&font-size=0.4"
  },
  {
    tempId: 19,
    testimonial: "Five-star experience from initial inquiry to final handover. Will definitely use again.",
    by: "Ishani Perera, Interior Designer at Space Studio, කොළඹ 05",
    imgSrc: "https://ui-avatars.com/api/?name=Ishani+Perera&background=2d4934&color=fff&size=150&bold=true&font-size=0.4"
  }
];

const TestimonialCard = ({ position, testimonial, handleMove, cardSize }) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={[
        'absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out',
        isCenter
          ? 'z-10 bg-heritage-green border-heritage-green'
          : 'z-0 bg-paper-white border-outline-border hover:border-heritage-green/50',
      ].join(' ')}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? '0px 8px 0px 4px #E0E0E0'
          : '0px 0px 0px 0px transparent',
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-outline-border"
        style={{ right: -2, top: 48, width: SQRT_5000, height: 2 }}
      />

      <img
        src={testimonial.imgSrc}
        alt={testimonial.by.split(',')[0]}
        className="mb-4 h-14 w-12 object-cover object-top bg-surface-dim"
        style={{ boxShadow: '3px 3px 0px #F9F8F6' }}
      />

      <h3
        className={[
          'text-base sm:text-xl font-medium leading-snug',
          isCenter ? 'text-paper-white' : 'text-on-surface',
        ].join(' ')}
      >
        "{testimonial.testimonial}"
      </h3>

      <p
        className={[
          'absolute bottom-8 left-8 right-8 mt-2 text-sm italic',
          isCenter ? 'text-paper-white/80' : 'text-outline',
        ].join(' ')}
      >
        — {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia('(min-width: 640px)');
      setCardSize(matches ? 365 : 290);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-soft-beige"
      style={{ height: 600 }}
    >
        
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={[
            'flex h-14 w-14 items-center justify-center text-2xl transition-all duration-300',
            'bg-paper-white border-2 border-outline-border text-on-surface',
            'hover:bg-heritage-green hover:text-paper-white hover:border-heritage-green',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-green focus-visible:ring-offset-2',
          ].join(' ')}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={[
            'flex h-14 w-14 items-center justify-center text-2xl transition-all duration-300',
            'bg-paper-white border-2 border-outline-border text-on-surface',
            'hover:bg-heritage-green hover:text-paper-white hover:border-heritage-green',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-green focus-visible:ring-offset-2',
          ].join(' ')}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
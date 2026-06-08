import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { 
    Plus, Search, Edit2, Trash2, Home, TreePine, 
    Building2, MessageSquare, LogOut, LayoutDashboard,
    X, Check, AlertCircle, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('properties');
    const [properties, setProperties] = useState([]);
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '', location: '', district: '', price: '', unit: 'Per Perch Upwards', 
        type: 'land', beds: 0, baths: 0, sqft: '', image: '', status: 'For Sale'
    });
    const [editingId, setEditingId] = useState(null);

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/login');
            return;
        }
        fetchData();
    }, [user, navigate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const [propRes, inqRes] = await Promise.all([
                axios.get('http://localhost:5000/api/properties'),
                axios.get('http://localhost:5000/api/inquiries', config)
            ]);
            setProperties(propRes.data);
            setInquiries(inqRes.data);
        } catch (error) {
            console.error('Error fetching dashboard data', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        try {
            if (editingId) {
                await axios.put(`http://localhost:5000/api/properties/${editingId}`, formData, config);
            } else {
                await axios.post('http://localhost:5000/api/properties', formData, config);
            }
            setShowModal(false);
            setEditingId(null);
            setFormData({ name: '', location: '', district: '', price: '', unit: 'Per Unit Upwards', type: 'land', beds: 0, baths: 0, sqft: '', image: '', status: 'For Sale' });
            fetchData();
        } catch (error) {
            alert('Error saving property');
        }
    };

    const deleteProperty = async (id) => {
        if (!window.confirm('Are you sure you want to delete this property?')) return;
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        try {
            await axios.delete(`http://localhost:5000/api/properties/${id}`, config);
            fetchData();
        } catch (error) {
            alert('Error deleting property');
        }
    };

    const editProperty = (prop) => {
        setFormData(prop);
        setEditingId(prop.id);
        setShowModal(true);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="animate-spin h-10 w-10 text-emerald-800" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-emerald-950 text-white flex flex-col pt-8">
                <div className="px-8 mb-10">
                    <h1 className="text-xl font-bold font-montserrat tracking-tight">Infinity Admin</h1>
                    <p className="text-emerald-400 text-xs mt-1 uppercase tracking-widest font-semibold">Dashboard</p>
                </div>
                
                <nav className="flex-1 px-4 space-y-2">
                    <button 
                        onClick={() => setActiveTab('properties')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'properties' ? 'bg-emerald-800 text-white' : 'text-emerald-100/60 hover:bg-emerald-900'}`}
                    >
                        <LayoutDashboard size={20} />
                        <span className="font-medium">Properties</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('inquiries')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'inquiries' ? 'bg-emerald-800 text-white' : 'text-emerald-100/60 hover:bg-emerald-900'}`}
                    >
                        <MessageSquare size={20} />
                        <span className="font-medium">Inquiries</span>
                    </button>
                </nav>

                <div className="p-4 border-t border-emerald-900">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-950/30 transition-all font-medium">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto px-10 py-10">
                <header className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 font-montserrat">
                            {activeTab === 'properties' ? 'Manage Properties' : 'Customer Inquiries'}
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">Manage your business data efficiently.</p>
                    </div>
                    {activeTab === 'properties' && (
                        <button 
                            onClick={() => { setEditingId(null); setShowModal(true); }}
                            className="bg-emerald-800 text-white flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-emerald-800/20 hover:bg-emerald-900 transition-all active:scale-95"
                        >
                            <Plus size={18} />
                            Add Property
                        </button>
                    )}
                </header>

                {activeTab === 'properties' ? (
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Property</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Type</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Price</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {properties.map(prop => (
                                        <tr key={prop.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <img src={prop.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
                                                    <div>
                                                        <p className="font-bold text-gray-900">{prop.name}</p>
                                                        <p className="text-xs text-gray-500">{prop.location}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 capitalize">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800">
                                                    {prop.type === 'land' ? <TreePine size={12} /> : prop.type === 'house' ? <Home size={12} /> : <Building2 size={12} />}
                                                    {prop.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-gray-700">Rs. {prop.price}</td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-bold px-2 py-1 rounded bg-amber-50 text-amber-700 uppercase tracking-wider">{prop.status}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-2">
                                                <button onClick={() => editProperty(prop)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={16} /></button>
                                                <button onClick={() => deleteProperty(prop.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {inquiries.map(inq => (
                            <div key={inq.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-800 font-bold">
                                            {inq.name[0]}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{inq.name}</h4>
                                            <p className="text-sm text-gray-500">{inq.email} • {inq.phone}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">{inq.message}</p>
                                    <div className="flex gap-4">
                                        <span className="text-[10px] font-bold uppercase text-gray-400 bg-gray-100 px-2 py-0.5 rounded">District: {inq.district}</span>
                                        <span className="text-[10px] font-bold uppercase text-gray-400 bg-gray-100 px-2 py-0.5 rounded">Type: {inq.propertyType}</span>
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-3 py-1 rounded-full">{inq.status}</span>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
                    <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl relative z-10 overflow-hidden transform transition-all">
                        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0">
                            <h3 className="text-xl font-bold text-gray-900">{editingId ? 'Edit Property' : 'Add New Property'}</h3>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto max-h-[70vh]">
                            <div className="grid grid-cols-2 gap-5 mb-5">
                                <div className="col-span-2">
                                    <label className="text-[10px] font-bold uppercase text-gray-500 mb-1.5 block">Property Name</label>
                                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-700/10 focus:border-emerald-700 text-sm outline-none" required />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase text-gray-500 mb-1.5 block">Type</label>
                                    <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-700/10 focus:border-emerald-700 text-sm outline-none">
                                        <option value="land">Land</option>
                                        <option value="house">House</option>
                                        <option value="apartment">Apartment</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase text-gray-500 mb-1.5 block">District</label>
                                    <input type="text" value={formData.district} onChange={(e) => setFormData({...formData, district: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-700/10 focus:border-emerald-700 text-sm outline-none" required />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-[10px] font-bold uppercase text-gray-500 mb-1.5 block">Location</label>
                                    <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-700/10 focus:border-emerald-700 text-sm outline-none" required />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase text-gray-500 mb-1.5 block">Price</label>
                                    <input type="text" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-700/10 focus:border-emerald-700 text-sm outline-none" required />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase text-gray-500 mb-1.5 block">Size / Sqft</label>
                                    <input type="text" value={formData.sqft} onChange={(e) => setFormData({...formData, sqft: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-700/10 focus:border-emerald-700 text-sm outline-none" required />
                                </div>
                                {formData.type !== 'land' && (
                                    <>
                                        <div>
                                            <label className="text-[10px] font-bold uppercase text-gray-500 mb-1.5 block">Beds</label>
                                            <input type="number" value={formData.beds} onChange={(e) => setFormData({...formData, beds: parseInt(e.target.value)})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-700/10 focus:border-emerald-700 text-sm outline-none" />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold uppercase text-gray-500 mb-1.5 block">Baths</label>
                                            <input type="number" value={formData.baths} onChange={(e) => setFormData({...formData, baths: parseInt(e.target.value)})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-700/10 focus:border-emerald-700 text-sm outline-none" />
                                        </div>
                                    </>
                                )}
                                <div className="col-span-2">
                                    <label className="text-[10px] font-bold uppercase text-gray-500 mb-1.5 block">Image URL</label>
                                    <input type="text" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-700/10 focus:border-emerald-700 text-sm outline-none" required />
                                </div>
                            </div>
                            <div className="flex gap-3 mt-8">
                                <button type="submit" className="flex-1 bg-emerald-800 text-white font-bold py-4 rounded-2xl hover:bg-emerald-900 transition-all shadow-lg shadow-emerald-800/20 active:scale-[0.98]">
                                    {editingId ? 'Update Property' : 'Save Property'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

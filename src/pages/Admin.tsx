import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import {
    ImageIcon,
    Video,
    Music,
    Calendar,
    Users,
    Trash2,
    Plus,
    ArrowLeft,
    Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';

type Tab = 'gallery' | 'videos' | 'discography' | 'agenda' | 'members';

export default function Admin() {
    const [activeTab, setActiveTab] = useState<Tab>('gallery');
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<any[]>([]);

    // Estados para o formulário
    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        fetchData(activeTab);
        setFormData({}); // Limpa form ao trocar de aba
    }, [activeTab]);

    const fetchData = async (table: Tab) => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from(table)
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setItems(data || []);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            alert('Erro ao carregar os dados. Verifique a conexão com o banco.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, table: Tab) => {
        if (!confirm('Tem certeza que deseja excluir este item?')) return;

        try {
            const { error } = await supabase.from(table).delete().eq('id', id);
            if (error) throw error;
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error('Erro ao deletar:', error);
            alert('Erro ao excluir item.');
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data, error } = await supabase
                .from(activeTab)
                .insert([formData])
                .select();

            if (error) throw error;

            // Atualizar a lista e limpar form
            if (data) {
                setItems([data[0], ...items]);
                setFormData({});
            }

        } catch (error) {
            console.error('Erro ao criar:', error);
            alert('Erro ao criar item. Verifique se todos os campos estão corretos.');
        } finally {
            setLoading(false);
        }
    };

    const renderFormInputs = () => {
        switch (activeTab) {
            case 'gallery':
                return (
                    <>
                        <InputField label="URL da Imagem" value={formData.image_url} onChange={(v) => setFormData({ ...formData, image_url: v })} required />
                        <InputField label="Título" value={formData.title} onChange={(v) => setFormData({ ...formData, title: v })} required />
                        <InputField label="Texto Alternativo (Alt)" value={formData.alt_text} onChange={(v) => setFormData({ ...formData, alt_text: v })} />
                    </>
                );
            case 'videos':
                return (
                    <>
                        <InputField label="URL da Thumbnail do Vídeo" value={formData.video_thumb_url} onChange={(v) => setFormData({ ...formData, video_thumb_url: v })} required />
                        <InputField label="Link do YouTube (Embed)" value={formData.youtube_url} onChange={(v) => setFormData({ ...formData, youtube_url: v })} required placeholder="Ex: https://www.youtube.com/embed/XXXXXX" />
                        <InputField label="Título" value={formData.title} onChange={(v) => setFormData({ ...formData, title: v })} required />
                        <InputField label="Descrição/Meta" value={formData.meta} onChange={(v) => setFormData({ ...formData, meta: v })} required placeholder="Ex: Lançado Out 2023" />
                        <InputField label="Duração" value={formData.duration} onChange={(v) => setFormData({ ...formData, duration: v })} required placeholder="Ex: 04:20" />
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Cor de Destaque</label>
                            <select
                                className="bg-card-bg border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
                                value={formData.accent || ''}
                                onChange={(e) => setFormData({ ...formData, accent: e.target.value as any })}
                                required
                            >
                                <option value="" disabled>Selecione uma cor</option>
                                <option value="primary">Primária (Verde/Amarelo)</option>
                                <option value="secondary">Secundária (Roxo)</option>
                            </select>
                        </div>
                    </>
                );
            case 'discography':
                return (
                    <>
                        <InputField label="URL da Capa" value={formData.cover_url} onChange={(v) => setFormData({ ...formData, cover_url: v })} required />
                        <InputField label="Título do Álbum/Música" value={formData.title} onChange={(v) => setFormData({ ...formData, title: v })} required />
                        <InputField label="Descrição/Meta" value={formData.meta} onChange={(v) => setFormData({ ...formData, meta: v })} required placeholder="Ex: LP • 2024" />
                    </>
                );
            case 'agenda':
                return (
                    <>
                        <InputField label="Data e Hora" type="datetime-local" value={formData.event_date} onChange={(v) => setFormData({ ...formData, event_date: v })} required />
                        <InputField label="Cidade e País" value={formData.location} onChange={(v) => setFormData({ ...formData, location: v })} required placeholder="Ex: São Paulo, BR" />
                        <InputField label="Local do Evento" value={formData.venue} onChange={(v) => setFormData({ ...formData, venue: v })} required placeholder="Ex: Allianz Parque" />
                        <InputField label="URL dos Ingressos" value={formData.ticket_url} onChange={(v) => setFormData({ ...formData, ticket_url: v })} />
                    </>
                );
            case 'members':
                return (
                    <>
                        <InputField label="Nome Curto (Ex: Ygor)" value={formData.name} onChange={(v) => setFormData({ ...formData, name: v })} required />
                        <InputField label="Função/Instrumento (Ex: Vocal)" value={formData.role} onChange={(v) => setFormData({ ...formData, role: v })} required />
                        <InputField label="URL da Foto de Capa (Thumb)" value={formData.image_url} onChange={(v) => setFormData({ ...formData, image_url: v })} required />
                        <InputField label="Nome Completo" value={formData.full_name} onChange={(v) => setFormData({ ...formData, full_name: v })} required />
                        <InputField label="Estilo Favorito" value={formData.favorite_style} onChange={(v) => setFormData({ ...formData, favorite_style: v })} required placeholder="Ex: Classic Rock" />

                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Texto de Apresentação</label>
                            <textarea
                                className="bg-card-bg border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary placeholder:text-white/20 min-h-[100px]"
                                value={formData.presentation_text || ''}
                                onChange={(e) => setFormData({ ...formData, presentation_text: e.target.value })}
                                required
                                placeholder="Breve biografia ou curiosidades sobre o integrante..."
                            />
                        </div>

                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">URLs da Galeria de Fotos (Pop-up)</label>
                            <textarea
                                className="bg-card-bg border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary placeholder:text-white/20 min-h-[100px]"
                                value={formData.gallery_urls || ''}
                                onChange={(e) => setFormData({ ...formData, gallery_urls: e.target.value })}
                                placeholder="Insira as URLs das fotos separadas por vírgula. Ex: https://foto1.jpg, https://foto2.jpg"
                            />
                            <p className="text-xs text-zinc-500">Separe cada link de imagem com uma vírgula.</p>
                        </div>
                    </>
                );
        }
    };

    const renderItemCard = (item: any) => {
        switch (activeTab) {
            case 'gallery':
                return (
                    <div className="flex gap-4 items-center border border-white/5 bg-white/5 p-4 rounded-xl">
                        <img src={item.image_url} alt={item.title} className="size-16 object-cover rounded-lg bg-black/50" />
                        <div className="flex-1">
                            <h4 className="font-bold">{item.title}</h4>
                            <p className="text-xs text-slate-500">{item.alt_text || 'Sem texto alternativo'}</p>
                        </div>
                    </div>
                );
            case 'videos':
                return (
                    <div className="flex gap-4 items-center border border-white/5 bg-white/5 p-4 rounded-xl">
                        <img src={item.video_thumb_url} alt={item.title} className="size-16 object-cover rounded-lg bg-black/50 aspect-video" />
                        <div className="flex-1">
                            <h4 className="font-bold flex items-center gap-2">
                                {item.title}
                                <span className={`size-3 rounded-full ${item.accent === 'primary' ? 'bg-primary' : 'bg-secondary'}`}></span>
                            </h4>
                            <p className="text-xs text-slate-500">{item.meta} • {item.duration}</p>
                        </div>
                    </div>
                );
            case 'discography':
                return (
                    <div className="flex gap-4 items-center border border-white/5 bg-white/5 p-4 rounded-xl">
                        <img src={item.cover_url} alt={item.title} className="size-16 object-cover rounded-lg bg-black/50" />
                        <div className="flex-1">
                            <h4 className="font-bold">{item.title}</h4>
                            <p className="text-xs text-slate-500">{item.meta}</p>
                        </div>
                    </div>
                );
            case 'agenda':
                return (
                    <div className="flex gap-4 items-center border border-white/5 bg-white/5 p-4 rounded-xl">
                        <div className="size-16 bg-card-bg rounded-lg border border-white/10 flex flex-col items-center justify-center shrink-0">
                            <span className="text-xs text-primary font-bold">{new Date(item.event_date).toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase()}</span>
                            <span className="text-xl font-black">{new Date(item.event_date).getDate()}</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold">{item.location}</h4>
                            <p className="text-xs text-slate-500">{item.venue}</p>
                        </div>
                    </div>
                );
            case 'members':
                return (
                    <div className="flex gap-4 items-center border border-white/5 bg-white/5 p-4 rounded-xl">
                        <img src={item.image_url} alt={item.name} className="size-16 object-cover rounded-lg bg-black/50" />
                        <div className="flex-1">
                            <h4 className="font-bold flex items-center gap-2">{item.name} <span className="text-xs bg-primary text-black px-2 py-0.5 rounded-full font-bold uppercase">{item.role}</span></h4>
                            <p className="text-xs text-slate-400 mt-1 line-clamp-1">{item.full_name}</p>
                            <p className="text-xs text-slate-500 mt-1">{item.gallery_urls ? (item.gallery_urls.split(',').length + ' fotos na galeria') : 'Sem galeria'}</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-background-dark text-slate-100 p-6 lg:p-12 font-sans selection:bg-primary selection:text-black">

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 border-b border-white/10 pb-6">
                    <div>
                        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest mb-4">
                            <ArrowLeft className="size-4" /> Voltar ao Site
                        </Link>
                        <h1 className="text-4xl font-black italic tracking-tighter uppercase"><span className="text-primary text-glow-primary">Roadie</span> Admin</h1>
                        <p className="text-slate-400 mt-2">Gerencie o conteúdo do site que vem do Supabase</p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Menu Lateral */}
                    <div className="lg:w-64 shrink-0 flex flex-col gap-2">
                        <TabButton active={activeTab === 'gallery'} onClick={() => setActiveTab('gallery')} icon={<ImageIcon size={20} />} label="Galeria" />
                        <TabButton active={activeTab === 'videos'} onClick={() => setActiveTab('videos')} icon={<Video size={20} />} label="Vídeos" />
                        <TabButton active={activeTab === 'discography'} onClick={() => setActiveTab('discography')} icon={<Music size={20} />} label="Discografia" />
                        <TabButton active={activeTab === 'agenda'} onClick={() => setActiveTab('agenda')} icon={<Calendar size={20} />} label="Agenda de Shows" />
                        <TabButton active={activeTab === 'members'} onClick={() => setActiveTab('members')} icon={<Users size={20} />} label="Integrantes" />
                    </div>

                    {/* Conteúdo Central */}
                    <div className="flex-1 flex flex-col gap-8 w-full">

                        {/* Form de Inserção */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h2 className="text-xl font-bold uppercase italic tracking-tighter mb-6 flex items-center gap-2">
                                <Plus className="text-primary size-5" /> Adicionar Novo
                            </h2>
                            <form onSubmit={handleCreate} className="flex flex-col gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {renderFormInputs()}
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="mt-4 bg-primary hover:bg-white text-black font-black uppercase tracking-tight py-3 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {loading && <Loader2 className="animate-spin size-5" />}
                                    Salvar {activeTab}
                                </button>
                            </form>
                        </div>

                        {/* Listagem Atual */}
                        <div>
                            <h2 className="text-xl font-bold uppercase italic tracking-tighter mb-6 border-b border-white/10 pb-4">
                                Itens Cadastrados no Banco
                            </h2>

                            {loading && items.length === 0 ? (
                                <div className="text-center text-slate-500 py-12 flex flex-col items-center gap-4">
                                    <Loader2 className="animate-spin size-8 text-primary" />
                                    Carregando...
                                </div>
                            ) : items.length === 0 ? (
                                <div className="text-center text-slate-500 py-12 border border-dashed border-white/10 rounded-2xl">
                                    Nenhum item cadastrado nesta categoria.
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {items.map(item => (
                                        <div key={item.id} className="relative group">
                                            {renderItemCard(item)}
                                            <button
                                                onClick={() => handleDelete(item.id, activeTab)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 size-10 bg-red-500/20 text-red-500 flex items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                                                title="Remover"
                                            >
                                                <Trash2 className="size-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-all focus:outline-none ${active ? 'bg-primary text-black' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
        >
            {icon} {label}
        </button>
    );
}

function InputField({ label, type = "text", value, onChange, required, placeholder }: any) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">{label}</label>
            <input
                type={type}
                className="bg-card-bg border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary placeholder:text-white/20"
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                placeholder={placeholder}
            />
        </div>
    );
}

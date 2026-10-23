import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  Users,
  Calendar,
  Download,
  Plus,
  Trash2,
  Edit2,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Utensils,
  Music,
  Settings,
  X,
  FileSpreadsheet,
  AlertCircle,
  RefreshCw,
  Save,
} from 'lucide-react';
import { EventDetails, GuestRsvp, RegistryItem } from '../types/wedding';
import { WeddingStorage } from '../services/storage';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onEventDetailsChange: (details: EventDetails) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  onEventDetailsChange,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'guests' | 'event' | 'songs' | 'settings'>('guests');

  // Data states
  const [guests, setGuests] = useState<GuestRsvp[]>([]);
  const [eventDetails, setEventDetails] = useState<EventDetails>(WeddingStorage.getEventDetails());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'accepted' | 'declined' | 'pending'>('all');

  // Edit / Add Guest Modal
  const [editingGuest, setEditingGuest] = useState<Partial<GuestRsvp> | null>(null);
  const [isNewGuest, setIsNewGuest] = useState(false);

  // Settings Feedback
  const [saveMessage, setSaveMessage] = useState('');

  const refreshData = () => {
    setGuests(WeddingStorage.getGuests());
    const details = WeddingStorage.getEventDetails();
    setEventDetails(details);
  };

  useEffect(() => {
    if (isOpen) {
      refreshData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin.trim() === eventDetails.adminPin) {
      setIsAuthenticated(true);
      setPinError(false);
      setEnteredPin('');
    } else {
      setPinError(true);
    }
  };

  const handleExportCsv = () => {
    const csvContent = WeddingStorage.exportGuestsCsv();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Wedding_Guest_List_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDeleteGuest = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove ${name} from the guest list?`)) {
      WeddingStorage.deleteGuest(id);
      refreshData();
    }
  };

  const handleSaveGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGuest || !editingGuest.fullName || !editingGuest.email) return;

    WeddingStorage.addOrUpdateGuest({
      id: editingGuest.id,
      fullName: editingGuest.fullName,
      email: editingGuest.email,
      phone: editingGuest.phone || '',
      status: editingGuest.status || 'accepted',
      plusOne: Boolean(editingGuest.plusOne),
      plusOneName: editingGuest.plusOneName || '',
      mealChoice: editingGuest.mealChoice || 'lamb_biryani',
      dietaryRestrictions: editingGuest.dietaryRestrictions || '',
      songRequest: editingGuest.songRequest || '',
      message: editingGuest.message || '',
      tableNumber: editingGuest.tableNumber ? Number(editingGuest.tableNumber) : undefined,
    });

    setEditingGuest(null);
    setIsNewGuest(false);
    refreshData();
  };

  const handleSaveEventDetails = (e: React.FormEvent) => {
    e.preventDefault();
    WeddingStorage.saveEventDetails(eventDetails);
    onEventDetailsChange(eventDetails);
    setSaveMessage('Event details successfully updated!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all guests, photos, and registry items back to pristine demo state?')) {
      WeddingStorage.resetAllData();
      refreshData();
      onEventDetailsChange(WeddingStorage.getEventDetails());
      setSaveMessage('All demo data has been re-initialized.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  // Filtered Guests
  const filteredGuests = guests.filter((g) => {
    const matchesSearch =
      g.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (g.songRequest && g.songRequest.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (g.dietaryRestrictions && g.dietaryRestrictions.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || g.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate metrics
  const acceptedGuests = guests.filter((g) => g.status === 'accepted');
  const plusOnesCount = acceptedGuests.filter((g) => g.plusOne).length;
  const totalAttendingHeads = acceptedGuests.length + plusOnesCount;
  const declinedCount = guests.filter((g) => g.status === 'declined').length;
  const pendingCount = guests.filter((g) => g.status === 'pending').length;

  const mealCounts = {
    lamb: acceptedGuests.filter((g) => g.mealChoice === 'lamb_biryani').length,
    pilau: acceptedGuests.filter((g) => g.mealChoice === 'swahili_pilau').length,
    fish: acceptedGuests.filter((g) => g.mealChoice === 'grilled_fish').length,
    veg: acceptedGuests.filter((g) => g.mealChoice === 'vegetarian').length,
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1d2c20]/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#ffffff] border border-[#d7c6a9] rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
        {/* Top Header Bar */}
        <div className="p-4 sm:p-6 border-b border-[#d7c6a9] flex items-center justify-between bg-[#f5efe3]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#ffffff] border border-[#d7c6a9] flex items-center justify-center text-[#768e77] shadow-sm">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#1d2c20] font-medium flex items-center gap-2">
                <span>Coordinator Admin Portal</span>
                <span className="text-[10px] bg-[#f0f4f0] text-[#768e77] border border-[#bcc8bc] px-2 py-0.5 rounded-full uppercase tracking-wider font-sans font-semibold">
                  Aysha & Kalimah
                </span>
              </h3>
              <p className="text-xs text-[#587059]">Manage guest lists, RSVPs, itinerary and event settings</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                type="button"
                onClick={() => setIsAuthenticated(false)}
                className="text-xs text-[#587059] hover:text-[#1d2c20] px-3 py-1.5 rounded-xl border border-[#d7c6a9] bg-white hover:bg-[#fbf8f2] cursor-pointer shadow-sm"
              >
                Lock Session
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="text-[#587059] hover:text-[#1d2c20] p-2 rounded-xl hover:bg-white/50 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Gate if not logged in */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-14 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-16 h-16 rounded-3xl bg-[#f0f4f0] border border-[#bcc8bc] flex items-center justify-center text-[#768e77] mb-5 shadow-sm">
              <Lock className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-2xl text-[#1d2c20] font-medium mb-2">Passcode Required</h4>
            <p className="text-xs sm:text-sm text-[#587059] max-w-sm mb-6">
              Enter the coordinator passcode to access the guest management database and wedding configurations.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-xs space-y-3">
              <input
                type="password"
                value={enteredPin}
                onChange={(e) => {
                  setEnteredPin(e.target.value);
                  setPinError(false);
                }}
                placeholder="Enter PIN (Default: bloom2026)"
                className="w-full bg-[#fbf8f2] border border-[#d7c6a9] focus:border-[#768e77] text-[#1d2c20] text-center rounded-xl px-4 py-3 text-sm outline-none tracking-widest font-mono"
                autoFocus
              />

              {pinError && (
                <div className="text-xs text-rose-600 flex items-center justify-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Incorrect passcode. Hint: <code className="text-[#768e77]">bloom2026</code></span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#768e77] hover:bg-[#587059] text-white font-medium py-3 rounded-xl text-sm transition cursor-pointer shadow-md"
              >
                Unlock Dashboard
              </button>

              <div className="p-2.5 rounded-xl bg-[#f5efe3] border border-[#d7c6a9] text-[11px] text-[#587059] text-center mt-3">
                Default Access PIN: <span className="text-[#768e77] font-mono font-bold">bloom2026</span>
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex-1 flex flex-col overflow-hidden bg-[#ffffff]">
            {/* Navigation Tabs */}
            <div className="px-6 pt-3 pb-0 border-b border-[#d7c6a9] flex items-center gap-2 overflow-x-auto bg-[#f8faf8]">
              {[
                { id: 'guests', label: 'Guest List & RSVPs', icon: Users, badge: guests.length },
                { id: 'event', label: 'Event Details & Venue', icon: Calendar },
                { id: 'songs', label: 'DJ / Nasheed Requests', icon: Music },
                { id: 'settings', label: 'Portal Settings', icon: Settings },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-3 text-xs font-medium border-b-2 cursor-pointer transition whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-[#768e77] text-[#768e77] font-semibold'
                        : 'border-transparent text-[#587059] hover:text-[#1d2c20]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                    {tab.badge !== undefined && (
                      <span className="text-[10px] bg-[#e5ece5] text-[#587059] px-1.5 py-0.2 rounded-full">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#fbf8f2]">
              {saveMessage && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>{saveMessage}</span>
                </div>
              )}

              {/* TAB 1: GUESTS & RSVPS */}
              {activeTab === 'guests' && (
                <div className="space-y-6">
                  {/* Metric Cards Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div className="bg-[#ffffff] border border-[#d7c6a9] rounded-2xl p-4 shadow-sm">
                      <span className="text-[11px] text-[#587059] block font-medium">Total Confirmed Guests</span>
                      <span className="font-serif text-2xl sm:text-3xl text-[#768e77] font-bold">
                        {totalAttendingHeads}
                      </span>
                      <span className="text-[10px] text-[#587059] block mt-0.5">
                        {acceptedGuests.length} primary + {plusOnesCount} plus-ones
                      </span>
                    </div>

                    <div className="bg-[#ffffff] border border-[#d7c6a9] rounded-2xl p-4 shadow-sm">
                      <span className="text-[11px] text-[#587059] block font-medium">Declined Invites</span>
                      <span className="font-serif text-2xl sm:text-3xl text-rose-600 font-bold">
                        {declinedCount}
                      </span>
                      <span className="text-[10px] text-[#587059] block mt-0.5">Sent well-wishes</span>
                    </div>

                    <div className="bg-[#ffffff] border border-[#d7c6a9] rounded-2xl p-4 shadow-sm">
                      <span className="text-[11px] text-[#587059] block font-medium">Pending Responses</span>
                      <span className="font-serif text-2xl sm:text-3xl text-amber-600 font-bold">
                        {pendingCount}
                      </span>
                      <span className="text-[10px] text-[#587059] block mt-0.5">Awaiting reply</span>
                    </div>

                    <div className="bg-[#ffffff] border border-[#d7c6a9] rounded-2xl p-4 shadow-sm">
                      <span className="text-[11px] text-[#587059] block font-medium">Halal Catering Entrées</span>
                      <div className="flex flex-wrap gap-2 text-xs font-semibold text-[#768e77] mt-1">
                        <span>Biryani: {mealCounts.lamb}</span>
                        <span>• Pilau: {mealCounts.pilau}</span>
                        <span>• Fish: {mealCounts.fish}</span>
                        <span>• Veg: {mealCounts.veg}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar: Search, Filter, Add Guest, CSV Export */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-1 max-w-md">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 text-[#587059] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search guest by name, email, meal..."
                          className="w-full bg-[#ffffff] border border-[#d7c6a9] focus:border-[#768e77] rounded-xl pl-9 pr-3 py-2 text-[#1d2c20] text-xs outline-none shadow-sm"
                        />
                      </div>

                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                        className="bg-[#ffffff] border border-[#d7c6a9] rounded-xl px-3 py-2 text-xs text-[#1d2c20] outline-none shadow-sm"
                      >
                        <option value="all">All Status</option>
                        <option value="accepted">Attending</option>
                        <option value="declined">Declined</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingGuest({
                            fullName: '',
                            email: '',
                            phone: '',
                            status: 'accepted',
                            plusOne: false,
                            mealChoice: 'lamb_biryani',
                            tableNumber: 1,
                          });
                          setIsNewGuest(true);
                        }}
                        className="bg-[#768e77] hover:bg-[#587059] text-white font-medium text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Guest</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleExportCsv}
                        className="bg-[#ffffff] hover:bg-[#f5efe3] border border-[#d7c6a9] text-[#1d2c20] font-medium text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm"
                        title="Download catering & guest list CSV"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5 text-[#768e77]" />
                        <span>Export CSV</span>
                      </button>
                    </div>
                  </div>

                  {/* Guest Roster Table */}
                  <div className="border border-[#d7c6a9] rounded-2xl overflow-hidden bg-[#ffffff] shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-[#1d2c20]">
                        <thead className="bg-[#f5efe3] text-[#587059] text-[10px] uppercase tracking-wider border-b border-[#d7c6a9]">
                          <tr>
                            <th className="py-3 px-4 font-semibold">Guest Name</th>
                            <th className="py-3 px-4 font-semibold">Contact</th>
                            <th className="py-3 px-4 font-semibold">Status</th>
                            <th className="py-3 px-4 font-semibold">Plus-One</th>
                            <th className="py-3 px-4 font-semibold">Entrée & Diet</th>
                            <th className="py-3 px-4 font-semibold">Table</th>
                            <th className="py-3 px-4 text-right font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f0f4f0]">
                          {filteredGuests.length === 0 ? (
                            <tr>
                              <td colSpan={7} className="py-8 text-center text-[#587059]">
                                No guests found matching the current search criteria.
                              </td>
                            </tr>
                          ) : (
                            filteredGuests.map((g) => (
                              <tr key={g.id} className="hover:bg-[#f0f4f0] transition">
                                <td className="py-3 px-4">
                                  <span className="font-medium text-[#1d2c20] block">{g.fullName}</span>
                                  {g.message && (
                                    <span className="text-[10px] text-[#587059] italic line-clamp-1">
                                      "{g.message}"
                                    </span>
                                  )}
                                </td>
                                <td className="py-3 px-4">
                                  <div>{g.email}</div>
                                  {g.phone && <div className="text-[10px] text-[#587059]">{g.phone}</div>}
                                </td>
                                <td className="py-3 px-4">
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                                      g.status === 'accepted'
                                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                        : g.status === 'declined'
                                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                                    }`}
                                  >
                                    {g.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  {g.plusOne ? (
                                    <span className="text-white font-medium">
                                      Yes ({g.plusOneName || 'Guest'})
                                    </span>
                                  ) : (
                                    <span className="text-white/40">No</span>
                                  )}
                                </td>
                                <td className="py-3 px-4">
                                  <span className="capitalize font-medium text-white">{g.mealChoice}</span>
                                  {g.dietaryRestrictions && (
                                    <span className="block text-[10px] text-amber-300/80">
                                      Alert: {g.dietaryRestrictions}
                                    </span>
                                  )}
                                </td>
                                <td className="py-3 px-4 font-mono">
                                  {g.tableNumber ? `Table ${g.tableNumber}` : '—'}
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setEditingGuest(g);
                                        setIsNewGuest(false);
                                      }}
                                      className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
                                      title="Edit RSVP"
                                    >
                                      <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteGuest(g.id, g.fullName)}
                                      className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                                      title="Delete Guest"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: EVENT DETAILS & VENUE */}
              {activeTab === 'event' && (
                <form onSubmit={handleSaveEventDetails} className="space-y-6 max-w-3xl">
                  <div className="bg-[#151824] p-5 rounded-2xl border border-white/10 space-y-4">
                    <h4 className="font-serif text-lg text-white font-medium">Couples Information & Date</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-white/70 mb-1">Partner One</label>
                        <input
                          type="text"
                          value={eventDetails.partnerOne}
                          onChange={(e) =>
                            setEventDetails({
                              ...eventDetails,
                              partnerOne: e.target.value,
                              coupleNames: `${e.target.value} & ${eventDetails.partnerTwo}`,
                            })
                          }
                          className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3.5 py-2 text-white text-xs outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-white/70 mb-1">Partner Two</label>
                        <input
                          type="text"
                          value={eventDetails.partnerTwo}
                          onChange={(e) =>
                            setEventDetails({
                              ...eventDetails,
                              partnerTwo: e.target.value,
                              coupleNames: `${eventDetails.partnerOne} & ${e.target.value}`,
                            })
                          }
                          className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3.5 py-2 text-white text-xs outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-white/70 mb-1">Wedding Date & Time</label>
                        <input
                          type="datetime-local"
                          value={eventDetails.weddingDate.slice(0, 16)}
                          onChange={(e) =>
                            setEventDetails({ ...eventDetails, weddingDate: e.target.value })
                          }
                          className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3.5 py-2 text-white text-xs outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-white/70 mb-1">Dress Code</label>
                        <input
                          type="text"
                          value={eventDetails.dressCode}
                          onChange={(e) =>
                            setEventDetails({ ...eventDetails, dressCode: e.target.value })
                          }
                          className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3.5 py-2 text-white text-xs outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-white/70 mb-1">Tagline</label>
                      <input
                        type="text"
                        value={eventDetails.tagline}
                        onChange={(e) => setEventDetails({ ...eventDetails, tagline: e.target.value })}
                        className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3.5 py-2 text-white text-xs outline-none"
                      />
                    </div>
                  </div>

                  {/* Ceremony Venue */}
                  <div className="bg-[#151824] p-5 rounded-2xl border border-white/10 space-y-3">
                    <h4 className="font-serif text-lg text-white font-medium">Ceremony Venue</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-white/70 mb-1">Venue Name</label>
                        <input
                          type="text"
                          value={eventDetails.ceremonyVenue.name}
                          onChange={(e) =>
                            setEventDetails({
                              ...eventDetails,
                              ceremonyVenue: { ...eventDetails.ceremonyVenue, name: e.target.value },
                            })
                          }
                          className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3.5 py-2 text-white text-xs outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-white/70 mb-1">Ceremony Time</label>
                        <input
                          type="text"
                          value={eventDetails.ceremonyVenue.time}
                          onChange={(e) =>
                            setEventDetails({
                              ...eventDetails,
                              ceremonyVenue: { ...eventDetails.ceremonyVenue, time: e.target.value },
                            })
                          }
                          className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3.5 py-2 text-white text-xs outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-white/70 mb-1">Address</label>
                      <input
                        type="text"
                        value={eventDetails.ceremonyVenue.address}
                        onChange={(e) =>
                          setEventDetails({
                            ...eventDetails,
                            ceremonyVenue: { ...eventDetails.ceremonyVenue, address: e.target.value },
                          })
                        }
                        className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3.5 py-2 text-white text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/70 mb-1">Arrival Notes</label>
                      <input
                        type="text"
                        value={eventDetails.ceremonyVenue.notes}
                        onChange={(e) =>
                          setEventDetails({
                            ...eventDetails,
                            ceremonyVenue: { ...eventDetails.ceremonyVenue, notes: e.target.value },
                          })
                        }
                        className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3.5 py-2 text-white text-xs outline-none"
                      />
                    </div>
                  </div>

                  {/* Reception Venue */}
                  <div className="bg-[#151824] p-5 rounded-2xl border border-white/10 space-y-3">
                    <h4 className="font-serif text-lg text-white font-medium">Reception Venue</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-white/70 mb-1">Venue Name</label>
                        <input
                          type="text"
                          value={eventDetails.receptionVenue.name}
                          onChange={(e) =>
                            setEventDetails({
                              ...eventDetails,
                              receptionVenue: { ...eventDetails.receptionVenue, name: e.target.value },
                            })
                          }
                          className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3.5 py-2 text-white text-xs outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-white/70 mb-1">Reception Time</label>
                        <input
                          type="text"
                          value={eventDetails.receptionVenue.time}
                          onChange={(e) =>
                            setEventDetails({
                              ...eventDetails,
                              receptionVenue: { ...eventDetails.receptionVenue, time: e.target.value },
                            })
                          }
                          className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3.5 py-2 text-white text-xs outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-white/70 mb-1">Address</label>
                      <input
                        type="text"
                        value={eventDetails.receptionVenue.address}
                        onChange={(e) =>
                          setEventDetails({
                            ...eventDetails,
                            receptionVenue: { ...eventDetails.receptionVenue, address: e.target.value },
                          })
                        }
                        className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3.5 py-2 text-white text-xs outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-[#d4af37] hover:bg-[#e8cf8d] text-black font-semibold text-xs px-6 py-3 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Event Changes</span>
                  </button>
                </form>
              )}

              {/* TAB 3: DJ SONGS & GUESTBOOK */}
              {activeTab === 'songs' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-serif text-lg text-white font-medium mb-3 flex items-center gap-2">
                      <Music className="w-4 h-4 text-[#d4af37]" />
                      <span>Guest DJ Song Requests ({guests.filter((g) => g.songRequest).length})</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {guests
                        .filter((g) => g.songRequest)
                        .map((g) => (
                          <div key={g.id} className="bg-[#151824] p-4 rounded-xl border border-white/10 flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center text-[#d4af37] shrink-0 mt-0.5">
                              <Music className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs text-white font-medium italic">"{g.songRequest}"</p>
                              <span className="text-[10px] text-white/50 block mt-1">Requested by {g.fullName}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-serif text-lg text-white font-medium mb-3">
                      Personal Notes & Well-Wishes ({guests.filter((g) => g.message).length})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {guests
                        .filter((g) => g.message)
                        .map((g) => (
                          <div key={g.id} className="bg-[#151824] p-4 rounded-xl border border-white/10">
                            <p className="text-xs text-white/80 italic mb-2">"{g.message}"</p>
                            <span className="text-[10px] text-[#e8cf8d] font-semibold">— {g.fullName}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: SETTINGS & PASSCODE */}
              {activeTab === 'settings' && (
                <div className="space-y-6 max-w-md">
                  <div className="bg-[#151824] p-5 rounded-2xl border border-white/10 space-y-4">
                    <h4 className="font-serif text-lg text-white font-medium">Coordinator Passcode</h4>
                    <p className="text-xs text-white/60">
                      Change the security PIN used to access this administrative portal.
                    </p>
                    <div>
                      <label className="block text-xs text-white/70 mb-1">Current / New PIN</label>
                      <input
                        type="text"
                        value={eventDetails.adminPin}
                        onChange={(e) =>
                          setEventDetails({ ...eventDetails, adminPin: e.target.value })
                        }
                        className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3.5 py-2 text-white text-xs outline-none font-mono"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        WeddingStorage.saveEventDetails(eventDetails);
                        setSaveMessage('Passcode updated successfully.');
                        setTimeout(() => setSaveMessage(''), 3000);
                      }}
                      className="bg-[#d4af37] text-black font-semibold text-xs px-4 py-2 rounded-xl cursor-pointer"
                    >
                      Update Passcode
                    </button>
                  </div>

                  {/* Reset Demo Data */}
                  <div className="bg-rose-950/20 p-5 rounded-2xl border border-rose-500/20 space-y-3">
                    <h4 className="font-serif text-lg text-rose-300 font-medium">Reset Demo Database</h4>
                    <p className="text-xs text-white/60">
                      Re-seed the guest list, registry funds, and galleries with pristine sample data.
                    </p>
                    <button
                      type="button"
                      onClick={handleResetData}
                      className="bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-200 text-xs px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer transition"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Re-seed Sample Data</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Edit/Add Guest Modal */}
      {editingGuest && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141624] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <button
              type="button"
              onClick={() => setEditingGuest(null)}
              className="absolute top-4 right-4 text-white/60 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="font-serif text-2xl text-white font-medium mb-4">
              {isNewGuest ? 'Add New Guest' : 'Edit Guest Details'}
            </h4>
            <form onSubmit={handleSaveGuest} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-white/70 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={editingGuest.fullName || ''}
                    onChange={(e) => setEditingGuest({ ...editingGuest, fullName: e.target.value })}
                    required
                    className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3 py-2 text-white text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/70 mb-1">Email *</label>
                  <input
                    type="email"
                    value={editingGuest.email || ''}
                    onChange={(e) => setEditingGuest({ ...editingGuest, email: e.target.value })}
                    required
                    className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3 py-2 text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-white/70 mb-1">RSVP Status</label>
                  <select
                    value={editingGuest.status || 'accepted'}
                    onChange={(e) => setEditingGuest({ ...editingGuest, status: e.target.value as any })}
                    className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3 py-2 text-white text-xs outline-none"
                  >
                    <option value="accepted">Accepted (Attending)</option>
                    <option value="declined">Declined</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/70 mb-1">Table Number</label>
                  <input
                    type="number"
                    value={editingGuest.tableNumber || ''}
                    onChange={(e) => setEditingGuest({ ...editingGuest, tableNumber: Number(e.target.value) })}
                    placeholder="e.g. 1"
                    className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3 py-2 text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-white/70 mb-1">Entrée Choice</label>
                  <select
                    value={editingGuest.mealChoice || 'lamb_biryani'}
                    onChange={(e) => setEditingGuest({ ...editingGuest, mealChoice: e.target.value as any })}
                    className="w-full bg-[#051109] border border-[#2b5937] rounded-xl px-3 py-2 text-white text-xs outline-none"
                  >
                    <option value="lamb_biryani">Royal Lamb Biryani</option>
                    <option value="swahili_pilau">Swahili Spiced Chicken Pilau</option>
                    <option value="grilled_fish">Coastal Spiced Fish</option>
                    <option value="vegetarian">Garden Truffle Pilau</option>
                    <option value="kids">Kids Menu</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/70 mb-1">Plus-One?</label>
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      checked={Boolean(editingGuest.plusOne)}
                      onChange={(e) => setEditingGuest({ ...editingGuest, plusOne: e.target.checked })}
                      className="accent-[#d4af37]"
                    />
                    <span className="text-xs text-white">Has Plus One</span>
                  </div>
                </div>
              </div>

              {editingGuest.plusOne && (
                <div>
                  <label className="block text-xs text-white/70 mb-1">Plus One Name</label>
                  <input
                    type="text"
                    value={editingGuest.plusOneName || ''}
                    onChange={(e) => setEditingGuest({ ...editingGuest, plusOneName: e.target.value })}
                    placeholder="e.g. Guest Name"
                    className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3 py-2 text-white text-xs outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs text-white/70 mb-1">Dietary Restrictions</label>
                <input
                  type="text"
                  value={editingGuest.dietaryRestrictions || ''}
                  onChange={(e) => setEditingGuest({ ...editingGuest, dietaryRestrictions: e.target.value })}
                  placeholder="e.g. Gluten-free, nut allergy"
                  className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3 py-2 text-white text-xs outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingGuest(null)}
                  className="px-4 py-2 rounded-xl border border-white/20 text-xs text-white/70 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#d4af37] text-black font-semibold text-xs cursor-pointer shadow"
                >
                  Save Guest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

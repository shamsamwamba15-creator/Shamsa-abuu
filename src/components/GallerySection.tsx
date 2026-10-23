import React, { useState, useEffect } from 'react';
import { Camera, Heart, X, ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import { GalleryPhoto } from '../types/wedding';
import { WeddingStorage } from '../services/storage';

export const GallerySection: React.FC = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'engagement' | 'venues' | 'moments' | 'guests'>('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Upload Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState('');

  const loadPhotos = () => {
    setPhotos(WeddingStorage.getGallery());
  };

  useEffect(() => {
    loadPhotos();
    const handleUpdate = () => loadPhotos();
    window.addEventListener('wedding_gallery_updated', handleUpdate);
    window.addEventListener('wedding_all_reset', handleUpdate);
    return () => {
      window.removeEventListener('wedding_gallery_updated', handleUpdate);
      window.removeEventListener('wedding_all_reset', handleUpdate);
    };
  }, []);

  const filteredPhotos = photos.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    WeddingStorage.likePhoto(id);
    loadPhotos();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size should be under 5MB.');
      return;
    }

    setUploadError('');
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
      setNewImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim()) {
      setUploadError('Please choose a photo to upload.');
      return;
    }
    if (!newTitle.trim()) {
      setUploadError('Please enter a title or memory caption.');
      return;
    }

    WeddingStorage.addPhoto({
      title: newTitle.trim(),
      caption: newCaption.trim() || newTitle.trim(),
      author: newAuthor.trim() || 'A Warm Guest',
      url: newImageUrl,
      category: 'guests',
    });

    setShowUploadModal(false);
    setNewTitle('');
    setNewCaption('');
    setNewAuthor('');
    setNewImageUrl('');
    setImagePreview(null);
    setUploadError('');
    setSelectedCategory('guests');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') setActivePhotoIndex(null);
      if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) => (prev !== null ? (prev + 1) % filteredPhotos.length : 0));
      }
      if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) => (prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, filteredPhotos.length]);

  return (
    <section id="gallery" className="py-24 px-4 relative z-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="font-arabic text-3xl sm:text-4xl text-[#768e77] block mb-1">ألبوم الذكريات المباركة</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1d2c20] font-normal mb-3">
            Moments & Photo Gallery
          </h2>
          <div className="w-16 h-0.5 bg-[#d7c6a9] mb-4" />
          <p className="text-[#587059] text-sm sm:text-base font-light max-w-xl">
            A visual anthology of our sacred Nikah milestones, preparations at Ubungo Plaza A, and guest memories. Guests are welcomed to upload moments from the day!
          </p>
        </div>

        {/* Upload Memory Button */}
        <button
          type="button"
          onClick={() => setShowUploadModal(true)}
          className="bg-[#f5efe3] hover:bg-[#e5ece5] border border-[#d7c6a9] text-[#1d2c20] font-medium text-xs sm:text-sm px-5 py-2.5 rounded-full transition cursor-pointer flex items-center gap-2 self-start md:self-auto shrink-0 shadow-sm"
        >
          <Camera className="w-4 h-4 text-[#768e77]" />
          <span>Upload a Photo</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {[
          { id: 'all', label: 'All Photos' },
          { id: 'engagement', label: 'Family & Khitbah' },
          { id: 'venues', label: 'Ubungo Plaza & Styling' },
          { id: 'moments', label: 'Pre-Nikah Henna & Tea' },
          { id: 'guests', label: 'Guest Memories' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedCategory(tab.id as any)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer transition ${
              selectedCategory === tab.id
                ? 'bg-[#768e77] text-white font-semibold shadow-sm'
                : 'bg-[#ffffff] border border-[#d7c6a9] text-[#587059] hover:bg-[#f5efe3]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Photo Gallery Grid */}
      {filteredPhotos.length === 0 ? (
        <div className="py-16 text-center border border-[#d7c6a9] rounded-3xl bg-[#ffffff]/80 shadow-sm">
          <Camera className="w-10 h-10 text-[#bcc8bc] mx-auto mb-3" />
          <h4 className="font-serif text-xl text-[#1d2c20] mb-1">No photos in this category yet</h4>
          <p className="text-xs text-[#587059] mb-4">Be the first to share a moment with the newlyweds!</p>
          <button
            type="button"
            onClick={() => setShowUploadModal(true)}
            className="text-xs text-[#768e77] underline cursor-pointer font-medium"
          >
            Upload a Photo Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => setActivePhotoIndex(idx)}
              className="group relative h-80 rounded-3xl overflow-hidden border border-[#d7c6a9] hover:border-[#768e77] bg-[#ffffff] cursor-pointer shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1d2c20]/90 via-[#1d2c20]/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#d7c6a9] font-semibold block mb-1">
                    {photo.category}
                  </span>
                  <h4 className="font-serif text-lg text-white font-medium line-clamp-1">{photo.title}</h4>
                  <p className="text-xs text-[#f5efe3] font-light line-clamp-1">{photo.caption}</p>
                  {photo.author && (
                    <span className="text-[10px] text-[#bcc8bc] block mt-1">By {photo.author}</span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={(e) => handleLike(photo.id, e)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-xs transition"
                >
                  <Heart className={`w-3.5 h-3.5 ${photo.likes > 0 ? 'fill-[#d7c6a9] text-[#d7c6a9]' : ''}`} />
                  <span>{photo.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && filteredPhotos[activePhotoIndex] && (
        <div className="fixed inset-0 z-50 bg-[#1d2c20]/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-20 cursor-pointer"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={() =>
              setActivePhotoIndex((activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length)
            }
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer z-20"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={() => setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length)}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer z-20"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center text-center">
            <img
              src={filteredPhotos[activePhotoIndex].url}
              alt={filteredPhotos[activePhotoIndex].title}
              className="max-h-[70vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/20"
            />
            <div className="mt-4 max-w-xl text-white">
              <h3 className="font-serif text-2xl font-medium">
                {filteredPhotos[activePhotoIndex].title}
              </h3>
              <p className="text-sm text-[#f5efe3] mt-1 font-light">
                {filteredPhotos[activePhotoIndex].caption}
              </p>
              <div className="flex items-center justify-center gap-4 mt-2 text-xs text-[#bcc8bc]">
                {filteredPhotos[activePhotoIndex].author && (
                  <span>Photo by {filteredPhotos[activePhotoIndex].author}</span>
                )}
                <span>•</span>
                <span>{filteredPhotos[activePhotoIndex].likes} loves</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Memory Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-[#1d2c20]/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#ffffff] border border-[#d7c6a9] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setShowUploadModal(false)}
              className="absolute top-4 right-4 text-[#587059] hover:text-[#1d2c20] p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Camera className="w-5 h-5 text-[#768e77]" />
              <h3 className="font-serif text-2xl text-[#1d2c20] font-medium">Upload a Photo</h3>
            </div>
            <p className="text-xs text-[#587059] mb-6">
              Share a picture with Aysha & Kalimah to be featured in the wedding anthology.
            </p>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              {uploadError && (
                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-700 text-xs border border-rose-200">
                  {uploadError}
                </div>
              )}

              <div>
                <label className="block text-xs text-[#2e4031] mb-1.5 font-medium">Choose Photo *</label>
                <div className="border-2 border-dashed border-[#bcc8bc] hover:border-[#768e77] rounded-2xl p-4 text-center cursor-pointer bg-[#fbf8f2] transition relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-36 mx-auto rounded-xl object-cover"
                      />
                      <span className="text-[10px] text-[#768e77] block mt-1">Tap to change image</span>
                    </div>
                  ) : (
                    <div className="py-3 flex flex-col items-center">
                      <Upload className="w-7 h-7 text-[#768e77] mb-2" />
                      <span className="text-xs text-[#1d2c20] font-medium">Click to select photo</span>
                      <span className="text-[10px] text-[#587059] mt-0.5">JPG, PNG up to 5MB</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#2e4031] mb-1 font-medium">Title / Memory Name *</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Celebrations with the bride"
                  className="w-full bg-[#fbf8f2] border border-[#d7c6a9] focus:border-[#768e77] rounded-xl px-3.5 py-2 text-[#1d2c20] text-xs outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-[#2e4031] mb-1 font-medium">Your Name</label>
                <input
                  type="text"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="e.g. Aunt Fatima & Uncle Rashid"
                  className="w-full bg-[#fbf8f2] border border-[#d7c6a9] focus:border-[#768e77] rounded-xl px-3.5 py-2 text-[#1d2c20] text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-[#2e4031] mb-1 font-medium">Caption / Du’a</label>
                <textarea
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  rows={2}
                  placeholder="Write a warm note or memory..."
                  className="w-full bg-[#fbf8f2] border border-[#d7c6a9] focus:border-[#768e77] rounded-xl px-3.5 py-2 text-[#1d2c20] text-xs outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#768e77] hover:bg-[#587059] text-white font-medium py-2.5 rounded-xl text-xs transition cursor-pointer shadow-md"
                >
                  Publish to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

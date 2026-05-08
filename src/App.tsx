import React, { useState } from 'react';
import { ArrowLeft, Menu, MapPin, Briefcase, ChevronRight, UploadCloud, CheckCircle2, Search, Lock } from 'lucide-react';
import { Job, mockJobs } from './data';

type Screen = 'HOME' | 'DETAILS' | 'APPLY' | 'SUCCESS';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('HOME');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const navigateTo = (screen: Screen, job?: Job) => {
    if (job) setSelectedJob(job);
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  const filteredJobs = mockJobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="android-wrapper outline outline-1 outline-gray-200 sm:rounded-[32px] sm:my-8 sm:h-[850px] shadow-2xl relative">
      <TopAppBar 
        screen={currentScreen} 
        onBack={() => {
          if (currentScreen === 'SUCCESS') setCurrentScreen('HOME');
          else if (currentScreen === 'APPLY') setCurrentScreen('DETAILS');
          else if (currentScreen === 'DETAILS') setCurrentScreen('HOME');
        }} 
      />
      
      <div className="flex-1 overflow-y-auto pb-8 relative">
        {currentScreen === 'HOME' && (
          <HomeScreen 
            jobs={filteredJobs} 
            searchQuery={searchQuery}
            onSearch={setSearchQuery}
            onJobSelect={(job) => navigateTo('DETAILS', job)} 
          />
        )}
        {currentScreen === 'DETAILS' && selectedJob && (
          <JobDetailsScreen 
            job={selectedJob} 
            onApply={() => navigateTo('APPLY')} 
          />
        )}
        {currentScreen === 'APPLY' && selectedJob && (
          <ApplyFormScreen 
            job={selectedJob} 
            onSubmit={() => navigateTo('SUCCESS')} 
          />
        )}
        {currentScreen === 'SUCCESS' && selectedJob && (
          <SuccessScreen 
            onHome={() => {
              setSelectedJob(null);
              navigateTo('HOME');
            }} 
          />
        )}
      </div>
      
      {/* Privacy Note Footer to ensure policy requirement */}
      {currentScreen !== 'SUCCESS' && (
        <div className="bg-[#F1F5F2] p-3 text-center text-xs text-[#52796F] flex items-center justify-center gap-1">
          <Lock size={12} />
          <span>Data collected only for recruitment. <a href="https://bhumigrowthsolutions.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="underline text-[var(--color-m3-primary)]">Privacy Policy</a></span>
        </div>
      )}
    </div>
  );
}

function TopAppBar({ screen, onBack }: { screen: Screen, onBack: () => void }) {
  let title = "Careers";
  if (screen === 'DETAILS') title = "Job Details";
  if (screen === 'APPLY') title = "Apply";
  if (screen === 'SUCCESS') title = "Application Sent";

  return (
    <div className="h-16 bg-[var(--color-m3-surface)] flex items-center px-4 sticky top-0 z-50">
      {screen === 'HOME' ? (
        <div className="flex items-center gap-2 w-full">
          <button className="p-2 -ml-2 rounded-full hover:bg-black/5 active:bg-black/10 transition shrink-0">
            <Menu size={24} className="text-[var(--color-m3-on-surface)]" />
          </button>
          
          <div className="flex items-center pt-0.5">
            <svg viewBox="0 0 215 46" className="h-[28px] text-[#0EA14A] shrink-0" fill="currentColor">
              <rect x="1.5" y="1.5" width="17" height="43" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <text transform="translate(12.5, 23) rotate(-90)" textAnchor="middle" fill="currentColor" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" fontWeight="800" fontSize="9.5" letterSpacing="1.5">BHUMI</text>
              <text x="22" y="43" fill="currentColor" fontFamily="Impact, 'Arial Black', sans-serif" fontWeight="400" fontSize="51.5" letterSpacing="-0.03em">CAREERS</text>
            </svg>
          </div>
        </div>
      ) : (
        <>
          <button 
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-black/5 active:bg-black/10 transition"
          >
            <ArrowLeft size={24} className="text-[var(--color-m3-on-surface)]" />
          </button>
          <h1 className="ml-2 text-[22px] font-normal text-[var(--color-m3-on-surface)]">{title}</h1>
        </>
      )}
    </div>
  );
}

function HomeScreen({ jobs, searchQuery, onSearch, onJobSelect }: { 
  jobs: Job[], 
  searchQuery: string,
  onSearch: (q: string) => void,
  onJobSelect: (job: Job) => void 
}) {
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#52796F]" size={20} />
        <input 
          type="text" 
          placeholder="Search jobs or locations..." 
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full bg-[#F1F5F2] rounded-[28px] py-4 pl-12 pr-4 text-[var(--color-m3-on-surface)] placeholder:text-[#52796F] outline-none focus:ring-2 focus:ring-[var(--color-m3-primary)]/20"
        />
      </div>

      <div className="text-sm font-medium text-[#52796F] mt-2 px-1">
        {jobs.length} Openings
      </div>

      <div className="flex flex-col gap-3">
        {jobs.map(job => (
          <div 
            key={job.id} 
            className="m3-card relative overflow-hidden group"
            onClick={() => onJobSelect(job)}
          >
            <div className="absolute top-0 right-0 p-4">
               <ChevronRight className="text-[#52796F] opacity-0 group-hover:opacity-100 transition" size={20} />
            </div>
            <h3 className="text-[18px] font-medium text-[var(--color-m3-on-surface)] pr-8">{job.title}</h3>
            
            <div className="flex flex-col gap-1.5 mt-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-[#52796F]">
                <MapPin size={16} className="text-[#52796F]" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#52796F]">
                <Briefcase size={16} className="text-[#52796F]" />
                <span>{job.experience}</span>
              </div>
            </div>

            <p className="text-sm text-[#52796F] border-t border-[#52796F]/20 pt-3 line-clamp-2">
              {job.shortDescription}
            </p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-xs font-medium text-[#52796F] bg-[#D8E2DC] px-2 py-1 rounded-md">{job.postedDate}</span>
              <button className="text-[var(--color-m3-primary)] font-medium text-sm">View Details</button>
            </div>
          </div>
        ))}
        {jobs.length === 0 && (
          <div className="text-center py-10 text-[#52796F]">
            No jobs found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}

function JobDetailsScreen({ job, onApply }: { job: Job, onApply: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-5 flex-1">
        <h2 className="text-[28px] font-medium text-[var(--color-m3-on-surface)] leading-tight mb-4">{job.title}</h2>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="bg-[var(--color-m3-primary-container)] text-[var(--color-m3-on-primary-container)] px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 font-medium">
             <MapPin size={16} /> {job.location}
          </div>
          <div className="bg-[#F1F5F2] text-[var(--color-m3-on-surface)] px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5">
             <Briefcase size={16} /> {job.experience}
          </div>
          {job.salary && (
            <div className="bg-[#F1F5F2] text-[var(--color-m3-on-surface)] px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5">
               {job.salary}
            </div>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-[18px] font-medium text-[var(--color-m3-on-surface)] mb-2">Description</h3>
          <p className="text-[16px] text-[#52796F] leading-relaxed">
            {job.fullDescription}
          </p>
        </div>

        {job.responsibilities && job.responsibilities.length > 0 && (
          <div className="mb-6">
            <h3 className="text-[18px] font-medium text-[var(--color-m3-on-surface)] mb-3">Responsibilities</h3>
            <ul className="space-y-3">
              {job.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex gap-3 text-[#52796F]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-m3-primary)] shrink-0 mt-2"></div>
                  <span className="text-[16px] leading-relaxed">{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-[18px] font-medium text-[var(--color-m3-on-surface)] mb-3">Requirements</h3>
          <ul className="space-y-3">
            {job.requirements.map((req, idx) => (
              <li key={idx} className="flex gap-3 text-[#52796F]">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-m3-primary)] shrink-0 mt-2"></div>
                <span className="text-[16px] leading-relaxed">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-4 bg-[var(--color-m3-surface)] border-t border-gray-200 sticky bottom-0 z-10 w-full shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <button onClick={onApply} className="m3-button w-full py-3.5 text-[16px]">
          Apply Now
        </button>
      </div>
    </div>
  );
}

function ApplyFormScreen({ job, onSubmit }: { job: Job, onSubmit: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    experience: ''
  });
  const [fileName, setFileName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Valid email required";
    if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = "Valid phone required";
    if (!formData.experience) newErrors.experience = "Please select experience";
    if (!fileName) newErrors.file = "Resume is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleApply = () => {
    if (validate()) {
      setSubmitting(true);
      // Simulate network
      setTimeout(() => {
        setSubmitting(false);
        onSubmit();
      }, 1500);
    }
  };

  return (
    <div className="p-5 flex flex-col gap-6">
      <div className="mb-2">
        <h2 className="text-[24px] font-medium text-[var(--color-m3-on-surface)] mb-1">Application</h2>
        <p className="text-sm text-[#52796F]">Applying for: <span className="font-medium text-[var(--color-m3-on-surface)]">{job.title}</span></p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="relative">
          <input 
            type="text" 
            className="m3-text-field" 
            placeholder="Full Name"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
          {errors.name && <span className="text-xs text-[var(--color-m3-error)] mt-1 block px-4">{errors.name}</span>}
        </div>

        <div className="relative">
          <input 
            type="email" 
            className="m3-text-field" 
            placeholder="Email Address"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
          {errors.email && <span className="text-xs text-[var(--color-m3-error)] mt-1 block px-4">{errors.email}</span>}
        </div>

        <div className="relative">
          <input 
            type="tel" 
            className="m3-text-field" 
            placeholder="Phone Number"
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
          />
          {errors.phone && <span className="text-xs text-[var(--color-m3-error)] mt-1 block px-4">{errors.phone}</span>}
        </div>

        <div className="relative">
          <input 
            type="text" 
            className="m3-text-field" 
            placeholder="City"
            value={formData.city}
            onChange={e => setFormData({...formData, city: e.target.value})}
          />
        </div>

        <div className="relative">
          <select 
            className="m3-text-field appearance-none" 
            value={formData.experience}
            onChange={e => setFormData({...formData, experience: e.target.value})}
          >
            <option value="" disabled>Total Experience</option>
            <option value="fresher">Fresher (0 years)</option>
            <option value="1-3">1 - 3 Years</option>
            <option value="3-5">3 - 5 Years</option>
            <option value="5+">5+ Years</option>
          </select>
          {errors.experience && <span className="text-xs text-[var(--color-m3-error)] mt-1 block px-4">{errors.experience}</span>}
        </div>

        <div className="mt-2">
          <p className="text-sm font-medium text-[var(--color-m3-on-surface)] mb-2 px-1">Resume Upload *</p>
          <label className="border-2 border-dashed border-[#52796F]/40 rounded-xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-[#F1F5F2] transition">
            <UploadCloud size={32} className="text-[var(--color-m3-primary)]" />
            <div className="text-center">
              {fileName ? (
                <span className="text-sm font-medium text-[var(--color-m3-on-surface)] break-all">{fileName}</span>
              ) : (
                <>
                  <span className="text-sm font-medium text-[var(--color-m3-primary)]">Tap to upload</span>
                  <span className="text-xs text-[#52796F] block mt-1">PDF or DOCX (Max 5MB)</span>
                </>
              )}
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFileName(e.target.files[0].name);
                }
              }}
            />
          </label>
          {errors.file && <span className="text-xs text-[var(--color-m3-error)] mt-1 block px-4">{errors.file}</span>}
        </div>
      </div>

      <div className="mt-8">
        <button 
          onClick={handleApply} 
          disabled={submitting}
          className="m3-button w-full py-3.5 text-[16px]"
        >
          {submitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </div>
  );
}

function SuccessScreen({ onHome }: { onHome: () => void }) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center mt-20">
      <div className="w-24 h-24 bg-[var(--color-m3-primary-container)] rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 size={48} className="text-[var(--color-m3-on-primary-container)]" />
      </div>
      
      <h2 className="text-[28px] font-medium text-[var(--color-m3-on-surface)] mb-3">Application Sent!</h2>
      
      <p className="text-[16px] text-[#52796F] mb-2 leading-relaxed">
        Thank you for applying to Bhumi Growth Solutions.
      </p>
      <p className="text-[14px] text-[#52796F] mb-10">
        Our recruitment team will review your application and contact you if your profile matches our requirements.
      </p>

      <div className="bg-[#F1F5F2] rounded-lg p-4 mb-10 w-full">
        <p className="text-xs font-medium text-[#52796F] uppercase tracking-wider mb-1">Application ID</p>
        <p className="text-sm font-mono text-[var(--color-m3-on-surface)]">BGS-{Math.floor(10000 + Math.random() * 90000)}</p>
      </div>

      <button onClick={onHome} className="m3-button-tonal w-full py-3.5 text-[16px]">
        Back to Jobs
      </button>
    </div>
  );
}

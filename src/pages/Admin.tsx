import React, { useState } from 'react';
import { ShieldCheck, UploadCloud, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/Layout';

const TARGET_FOLDERS = [
  'src/assets',
  'src/assets/images/icons',
  'src/assets/images',
  'src/assets/images/about',
  'src/assets/images/bridal',
  'src/assets/images/engagement',
  'src/assets/images/hairstyling',
  'src/assets/images/hero',
  'src/assets/images/party',
  'src/assets/images/portfolio-featured',
  'src/assets/images/reception',
  'src/assets/images/reviews',
];

export default function AdminUpload() {
  const [token, setToken] = useState('');
  const [folder, setFolder] = useState(TARGET_FOLDERS[0]);
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
      setStatus('idle');
      setMessage('');
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      setStatus('error');
      setMessage('GitHub Personal Access Token is required.');
      return;
    }
    
    if (files.length === 0) {
      setStatus('error');
      setMessage('Please select at least one image to upload.');
      return;
    }

    setStatus('uploading');
    
    let successCount = 0;
    let failCount = 0;
    let lastError = '';

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setMessage(`Uploading ${i + 1} of ${files.length}: ${file.name}...`);

      try {
        const base64String = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve((reader.result as string).split(',')[1]);
          };
          reader.onerror = () => reject(new Error('Failed to read file'));
          reader.readAsDataURL(file);
        });
        
        const safeFilename = file.name.replace(/\s+/g, '-');
        
        const response = await fetch(`https://api.github.com/repos/Avalanch22/glowandglamstudio/contents/${folder}/${safeFilename}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: `Admin Upload: Add ${safeFilename} to ${folder}`,
            content: base64String
          })
        });

        const data = await response.json();

        if (response.ok) {
          successCount++;
        } else {
          failCount++;
          if (response.status === 422) {
            lastError = `"${safeFilename}" already exists.`;
          } else {
            lastError = data.message || 'Unknown error.';
          }
        }
      } catch (err: any) {
        failCount++;
        lastError = err.message;
      }
    }

    if (failCount === 0) {
      setStatus('success');
      setMessage(`Successfully uploaded ${successCount} image${successCount > 1 ? 's' : ''}!`);
      setFiles([]); // Reset
    } else {
      setStatus('error');
      setMessage(`Uploaded ${successCount}, Failed ${failCount}. Last error: ${lastError}`);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 md:px-6 py-12">
      <Reveal className="w-full max-w-lg">
        <div className="bg-[#161310]/95 border border-primary/30 rounded-2xl p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl relative overflow-hidden">
          
          {/* Ambient Glow */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="text-center mb-8 relative z-10">
            <div className="w-14 h-14 mx-auto bg-primary/15 border border-primary/30 rounded-full flex items-center justify-center text-primary mb-4 shadow-lg shadow-primary/10">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="font-display text-3xl font-light text-foreground tracking-wide">
              Secure Image Upload
            </h1>
            <p className="text-sm text-muted-foreground mt-2 font-light">
              Upload images directly to the codebase via GitHub API.
            </p>
          </div>

          <form onSubmit={handleUpload} className="space-y-6 relative z-10">
            {/* Token Input */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-foreground/80 uppercase tracking-widest pl-1 flex items-center justify-between">
                <span>GitHub Personal Access Token</span>
                <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">Secret</span>
              </label>
              <input
                type="password"
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full h-12 bg-black/40 border border-border/50 rounded-lg px-4 text-sm text-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-all font-mono"
                required
              />
              <p className="text-[10px] text-muted-foreground pl-1">
                This token is never saved. It only lives in your browser temporarily.
              </p>
            </div>

            {/* Folder Dropdown */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-foreground/80 uppercase tracking-widest pl-1">
                Destination Folder
              </label>
              <select
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
                className="w-full h-12 bg-black/40 border border-border/50 rounded-lg px-4 text-sm text-foreground focus:outline-none focus:border-primary/60 transition-all appearance-none cursor-pointer"
              >
                {TARGET_FOLDERS.map((f) => (
                  <option key={f} value={f} className="bg-[#120F0D]">
                    {f}
                  </option>
                ))}
              </select>
            </div>

            {/* File Input */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-foreground/80 uppercase tracking-widest pl-1">
                Image Files
              </label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border/50 rounded-xl cursor-pointer bg-black/20 hover:bg-black/40 hover:border-primary/50 transition-all group relative overflow-hidden">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {files.length > 0 ? (
                    <>
                      <CheckCircle2 className="w-8 h-8 text-primary mb-2" />
                      <p className="text-sm font-medium text-foreground truncate max-w-[200px]">
                        {files.length} {files.length === 1 ? 'file' : 'files'} selected
                      </p>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors mb-2" />
                      <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-muted-foreground/70 mt-1">Images (JPG, PNG, WEBP, HEIC) & Videos (MP4, MOV)</p>
                      <p className="text-[10px] text-red-400/80 mt-1 text-center px-4">Max 50MB per file (GitHub limit)</p>
                    </>
                  )}
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".jpg,.jpeg,.png,.webp,.heic,.heif,.mp4,.mov,.qt" 
                  multiple
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {/* Status Messages */}
            {message && (
              <div className={`p-3.5 rounded-lg text-sm border flex items-start gap-3 transition-all ${
                status === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-200' :
                status === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-200' :
                'bg-primary/10 border-primary/30 text-primary'
              }`}>
                {status === 'success' && <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-400" />}
                {status === 'error' && <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-400" />}
                {status === 'uploading' && <Loader2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary animate-spin" />}
                <span className="leading-relaxed">{message}</span>
              </div>
            )}

            {/* Submit Button */}
            <Button 
              type="submit" 
              disabled={status === 'uploading' || files.length === 0 || !token}
              className="w-full h-12 text-sm font-semibold tracking-wide flex items-center justify-center gap-2"
            >
              {status === 'uploading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading securely...
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4" />
                  Upload to GitHub
                </>
              )}
            </Button>

          </form>
        </div>
      </Reveal>
    </div>
  );
}


import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, Loader2, CheckCircle2, AlertCircle, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { UploadedFile } from '@/types/contract';

interface ContractUploaderProps {
  onFilesSelected: (files: UploadedFile[]) => void;
  uploadedFiles: UploadedFile[];
  onRemoveFile: (index: number) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

const ContractUploader = ({
  onFilesSelected,
  uploadedFiles,
  onRemoveFile,
  onAnalyze,
  isAnalyzing,
}: ContractUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
        file,
        status: 'pending',
        progress: 0,
      }));
      onFilesSelected(newFiles);
    },
    [onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const getFileIcon = (file: UploadedFile) => {
    if (file.status === 'processing') return <Loader2 className="w-5 h-5 text-accent animate-spin" />;
    if (file.status === 'complete') return <CheckCircle2 className="w-5 h-5 text-risk-low" />;
    if (file.status === 'error') return <AlertCircle className="w-5 h-5 text-risk-high" />;
    return <File className="w-5 h-5 text-muted-foreground" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <section id="analyze" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Upload Your Contract
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              Our AI will analyze your contract and provide detailed insights, risk assessment, 
              and plain-language explanations.
            </p>
          </div>

          {/* Upload Zone */}
          <div
            {...getRootProps()}
            className={cn(
              'relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300',
              isDragActive
                ? 'border-accent bg-accent/5 scale-[1.02]'
                : 'border-border hover:border-accent/50 hover:bg-secondary/30'
            )}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4">
              <div
                className={cn(
                  'w-16 h-16 rounded-full flex items-center justify-center transition-all',
                  isDragActive ? 'bg-accent/20' : 'bg-secondary'
                )}
              >
                <Upload
                  className={cn(
                    'w-7 h-7 transition-colors',
                    isDragActive ? 'text-accent' : 'text-muted-foreground'
                  )}
                />
              </div>
              <div>
                <p className="text-lg font-body font-medium text-foreground mb-1">
                  {isDragActive ? 'Drop your contract here' : 'Drag & drop your contract'}
                </p>
                <p className="text-sm text-muted-foreground">
                  or <span className="text-accent font-medium">browse files</span>
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Supports PDF, DOC, DOCX, TXT (Max 10MB)
              </p>
            </div>
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="mt-6 space-y-3">
              {uploadedFiles.map((uploadedFile, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border shadow-soft"
                >
                  {getFileIcon(uploadedFile)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {uploadedFile.file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(uploadedFile.file.size)}
                    </p>
                    {uploadedFile.status === 'processing' && (
                      <Progress value={uploadedFile.progress} className="mt-2 h-1" />
                    )}
                    {uploadedFile.error && (
                      <p className="text-xs text-risk-high mt-1">{uploadedFile.error}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveFile(index)}
                    disabled={uploadedFile.status === 'processing'}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}

              {/* Analyze Button */}
              <Button
                variant="hero"
                size="lg"
                className="w-full mt-4"
                onClick={onAnalyze}
                disabled={isAnalyzing || uploadedFiles.every(f => f.status !== 'pending')}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing Contract...
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    Analyze {uploadedFiles.length} Contract{uploadedFiles.length > 1 ? 's' : ''}
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Supported Languages */}
          <div className="mt-8 flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>Supported languages:</span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-secondary text-secondary-foreground">English</span>
              <span className="px-2 py-1 rounded bg-secondary text-secondary-foreground">हिंदी</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContractUploader;

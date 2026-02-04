import { useState, useRef } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import ContractUploader from '@/components/upload/ContractUploader';
import FeaturesSection from '@/components/landing/FeaturesSection';
import ContractTypesSection from '@/components/landing/ContractTypesSection';
import AnalysisDashboard from '@/components/analysis/AnalysisDashboard';
import { analyzeContract } from '@/services/contractAnalysis';
import type { UploadedFile, ContractAnalysis } from '@/types/contract';

const Index = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<ContractAnalysis | null>(null);
  const analyzeRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    analyzeRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFilesSelected = (files: UploadedFile[]) => {
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAnalyze = async () => {
    if (uploadedFiles.length === 0) return;

    setIsAnalyzing(true);

    // Analyze the first pending file
    const fileToAnalyze = uploadedFiles.find((f) => f.status === 'pending');
    if (!fileToAnalyze) {
      setIsAnalyzing(false);
      return;
    }

    const fileIndex = uploadedFiles.indexOf(fileToAnalyze);

    // Update status to processing
    setUploadedFiles((prev) =>
      prev.map((f, i) => (i === fileIndex ? { ...f, status: 'processing' as const } : f))
    );

    try {
      const analysis = await analyzeContract(fileToAnalyze.file, (progress) => {
        setUploadedFiles((prev) =>
          prev.map((f, i) => (i === fileIndex ? { ...f, progress } : f))
        );
      });

      // Update status to complete
      setUploadedFiles((prev) =>
        prev.map((f, i) =>
          i === fileIndex ? { ...f, status: 'complete' as const, analysis } : f
        )
      );

      setCurrentAnalysis(analysis);
    } catch (error) {
      setUploadedFiles((prev) =>
        prev.map((f, i) =>
          i === fileIndex
            ? { ...f, status: 'error' as const, error: 'Failed to analyze contract' }
            : f
        )
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleBackToUpload = () => {
    setCurrentAnalysis(null);
    setUploadedFiles([]);
  };

  // If we have analysis results, show the dashboard
  if (currentAnalysis) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <AnalysisDashboard analysis={currentAnalysis} onBack={handleBackToUpload} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection onGetStarted={handleGetStarted} />
        <div ref={analyzeRef}>
          <ContractUploader
            onFilesSelected={handleFilesSelected}
            uploadedFiles={uploadedFiles}
            onRemoveFile={handleRemoveFile}
            onAnalyze={handleAnalyze}
            isAnalyzing={isAnalyzing}
          />
        </div>
        <FeaturesSection />
        <ContractTypesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

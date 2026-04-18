import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Award, Star, Download, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ isOpen, onClose }) => {
  const { user, t } = useApp();
  const certificateRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !user) return null;

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;
    
    const canvas = await html2canvas(certificateRef.current, {
      scale: 2,
      backgroundColor: '#450a0a',
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('l', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`KaaryaUp-Certificate-${user.name}.pdf`);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black bg-opacity-90 overflow-y-auto">
      <div className="max-w-4xl w-full space-y-6">
        <div className="flex justify-end">
          <button onClick={onClose} className="p-2 bg-[var(--accent-app)] text-white hover:rotate-90 transition-transform">
            <X size={32} />
          </button>
        </div>

        {/* The Certificate Stage */}
        <div 
          ref={certificateRef}
          className="relative bg-[#450a0a] border-[12px] border-white p-12 text-white overflow-hidden shadow-2xl"
          style={{ aspectRatio: '1.414/1' }}
        >
          {/* Decorative Corners */}
          <div className="absolute top-4 left-4 border-t-4 border-l-4 border-white w-24 h-24" />
          <div className="absolute top-4 right-4 border-t-4 border-r-4 border-white w-24 h-24" />
          <div className="absolute bottom-4 left-4 border-b-4 border-l-4 border-white w-24 h-24" />
          <div className="absolute bottom-4 right-4 border-b-4 border-r-4 border-white w-24 h-24" />

          {/* Center Content */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-8 h-full justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10 }}
            >
              <Award size={100} className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
            </motion.div>

            <div className="space-y-2">
              <h1 className="font-retro text-5xl tracking-tighter">CERTIFICATE OF ACHIEVEMENT</h1>
              <div className="h-1 w-64 bg-white mx-auto opacity-30" />
            </div>

            <p className="font-display text-xl tracking-widest opacity-80">THIS IS PROUDLY PRESENTED TO</p>
            
            <h2 className="font-retro text-6xl text-yellow-400 py-4 underline decoration-4 underline-offset-8">
              {user.name}
            </h2>

            <p className="font-display text-lg max-w-2xl leading-relaxed opacity-70">
              For successfully completing multiple creative missions, mastering diverse skill sets, 
              and achieving <span className="text-yellow-400 font-bold">Level {user.level}</span> on the KaaryaUp platform. 
              Your dedication to professional growth is exemplary.
            </p>

            <div className="grid grid-cols-3 w-full pt-12">
              <div className="flex flex-col items-center space-y-2">
                <div className="h-px w-32 bg-white opacity-50" />
                <span className="font-retro text-[10px] opacity-60">DATE</span>
                <span className="font-display font-bold">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-center items-center">
                <div className="w-24 h-24 border-4 border-white rounded-full flex items-center justify-center rotate-12 bg-white bg-opacity-5">
                   <Star size={40} className="text-yellow-400" fill="currentColor" />
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="h-px w-32 bg-white opacity-50" />
                <span className="font-retro text-[10px] opacity-60">YUVA AI VERIFIED</span>
                <span className="font-display font-bold italic tracking-tighter text-yellow-500">KaaryaUp Official</span>
              </div>
            </div>
          </div>

          {/* Background Texture */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0 bg-white" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '10px 10px' }} />
          </div>
        </div>

        <button 
          onClick={downloadCertificate}
          className="w-full retro-button bg-white text-[#450a0a] py-6 text-2xl group flex items-center justify-center gap-4"
        >
          <Download size={28} className="group-hover:translate-y-1 transition-transform" /> 
          DOWNLOAD LEGACY CERTIFICATE
        </button>
      </div>
    </div>
  );
};

export default CertificateModal;

import { useState } from 'react';
import IDUpload from '../components/IDUpload';
import SelfieCapture from '../components/SelfieCapture';
import MatchResult from '../components/MatchResult';

export default function Verify() {
  const [step, setStep] = useState(1);
  const [idImage, setIdImage] = useState(null);
  const [selfie, setSelfie] = useState(null);

  return (
    <div className="p-6 max-w-xl mx-auto mt-10 bg-white rounded shadow">
      {step === 1 && <IDUpload onNext={(img) => { setIdImage(img); setStep(2); }} />}
      {step === 2 && <SelfieCapture onNext={(img) => { setSelfie(img); setStep(3); }} />}
      {step === 3 && <MatchResult idImage={idImage} selfie={selfie} />}
    </div>
  );
}

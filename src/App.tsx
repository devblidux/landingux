import HeroSection from './components/HeroSection';
import BeforeSection from './components/BeforeSection';
import TurningPointSection from './components/TurningPointSection';
import NewWorkflowSection from './components/NewWorkflowSection';
import MethodologyExamplesSection from './components/MethodologyExamplesSection';
import RoleEvolutionSection from './components/RoleEvolutionSection';
import FutureSection from './components/FutureSection';
import FinalSection from './components/FinalSection';
import SectionContinueControl from './components/SectionContinueControl';

function App() {
  return (
    <div className="bg-[#0a0e1a]">
      <SectionContinueControl />
      <HeroSection />
      <BeforeSection />
      <TurningPointSection />
      <NewWorkflowSection />
      <RoleEvolutionSection />
      <MethodologyExamplesSection />
      <FutureSection />
      <FinalSection />
    </div>
  );
}

export default App;

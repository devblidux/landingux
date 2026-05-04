import HeroSection from './components/HeroSection';
import BeforeSection from './components/BeforeSection';
import TurningPointSection from './components/TurningPointSection';
import NewWorkflowSection from './components/NewWorkflowSection';
import TimelineSection from './components/TimelineSection';
import BusinessImpactSection from './components/BusinessImpactSection';
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
      <TimelineSection />
      <BusinessImpactSection />
      <RoleEvolutionSection />
      <FutureSection />
      <FinalSection />
    </div>
  );
}

export default App;

import styled, { keyframes } from "styled-components";
import { Rocket, ArrowRight } from "lucide-react";

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-18px); }
`;

const fillProgress = keyframes`
  from { width: 12%; }
  to   { width: 95%; }
`;

// Styled Components
const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Content = styled.div`
  text-align: center;
  max-width: 620px;
  position: relative;
`;

const RocketIcon = styled(Rocket)`
  color: #a5b4fc;
  margin-bottom: 2rem;
  width: 88px;
  height: 88px;
  stroke-width: 1.4;
  opacity: 0.9;
  animation: ${float} 6s ease-in-out infinite;
`;

const Title = styled.h1`
  font-size: 3.8rem;
  font-weight: 700;
  margin: 0 0 1.2rem;
  background: linear-gradient(90deg, #c084fc, #a5b4fc, #7dd3fc);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: -1px;

  @media (max-width: 520px) {
    font-size: 2.9rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.32rem;
  line-height: 1.6;
  color: #94a3b8;
  margin: 0 0 3rem;

  @media (max-width: 520px) {
    font-size: 1.15rem;
  }
`;

const ProgressContainer = styled.div`
  margin: 2.5rem 0 3rem;
  position: relative;
  border: 1px solid #4f47e5;
  border-radius: 999px;
`;

const ProgressBar = styled.div`
  height: 12px;
  background: linear-gradient(90deg, #6366f1, #a78bfa);
  border-radius: 999px;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.35);
  animation: ${fillProgress} 2.8s ease-out forwards;
  animation-delay: 0.7s;
`;

const ProgressLabel = styled.div`
  position: absolute;
  top: -2.4rem;
  right: 0;
  font-size: 1.1rem;
  color: #cbd5e1;
  font-weight: 500;
`;


const BackButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.95rem 2.1rem;
  background: #4f46e5;
  color: white;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.25s ease;

  &:hover {
    background: #6366f1;
    transform: translateY(-2px);
    box-shadow: 0 14px 30px rgba(79, 70, 229, 0.4);
  }

  &:active {
    transform: scale(0.97);
  }
`;


const InProgressPage = () => {
  return (
    <PageWrapper>
      <Content>
        <RocketIcon />

        <Title>Page Under Construction</Title>

        <Subtitle>
          This page is currently under development.
          <br />
          It will be available soon.
        </Subtitle>

        <ProgressContainer>
          <ProgressBar />
          <ProgressLabel>~90% complete</ProgressLabel>
        </ProgressContainer>

        <BackButton href="https://chitomed.com">
          Back to Homepage <ArrowRight size={18} />
        </BackButton>

        {/* <Estimate>
          Estimated return: <strong>end of February / early March</strong>
        </Estimate> */}
      </Content>
    </PageWrapper>
  );
};

export default InProgressPage;

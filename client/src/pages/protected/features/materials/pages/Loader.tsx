import styled from 'styled-components'
import SkeletonLoader from '../../../../../components/SkeletonLoader'
const Container = styled.div`
display: flex;
flex-direction: column;
gap:.8rem;
`

const El = styled.div`
width: 100%;
height: 2rem;
border-radius: 0.5px;
position: relative;
`
const Loader = () => {
  return (
    <Container>
      <El>
        <SkeletonLoader />
      </El>
      <El>
        <SkeletonLoader />
      </El>
      <El>
        <SkeletonLoader />
      </El>
      <El>
        <SkeletonLoader />
      </El>
      <El>
        <SkeletonLoader />
      </El>
      <El>
        <SkeletonLoader />
      </El>
      <El>
        <SkeletonLoader />
      </El>
      <El>
        <SkeletonLoader />
      </El>
      <El>
        <SkeletonLoader />
      </El>
      <El>
        <SkeletonLoader />
      </El>
      <El>
        <SkeletonLoader />
      </El>
      <El>
        <SkeletonLoader />
      </El>
      <El>
        <SkeletonLoader />
      </El>
      <El>
        <SkeletonLoader />
      </El>
      <El>
        <SkeletonLoader />
      </El>
    </Container>
  );
}

export default Loader
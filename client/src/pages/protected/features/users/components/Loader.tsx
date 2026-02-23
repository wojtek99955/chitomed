import styled from 'styled-components'
import SkeletonLoader from '../../../../../components/SkeletonLoader'
const Container = styled.div`
display: flex;
flex-direction: column;
gap:1rem;
`

const El = styled.div`
position: relative;
width: 100%;
height: 3rem;
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
    </Container>
  );
}

export default Loader
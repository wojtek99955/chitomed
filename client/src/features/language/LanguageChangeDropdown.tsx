import styled from "styled-components"

const Container = styled.div`
  border: 2px solid white;
  border-radius: 8px;
  border-radius: 40px;
  padding: 0.7rem 1.8rem;

  font-weight: 500;
  color: white;
  &:hover {
    color: #322683;
    background-color: white;
    border-color: white;
  }
`;
const LanguageChangeDropdown = () => {
  return (
    <Container>PL</Container>
  )
}

export default LanguageChangeDropdown
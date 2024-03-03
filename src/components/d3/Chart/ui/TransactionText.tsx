import styled from 'styled-components';

const TransactionText = styled.span`
  margin: 0 0.3rem;
  font-weight: 900;
`;

export const Credit = styled(TransactionText)`
  color: green;
`;

export const Debit = styled(TransactionText)`
  color: red;
`;

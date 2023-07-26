import styled from "styled-components";
import { SM_DOWN } from "../../utils/viewport";

const BlocTabs = styled.div`
  display: flex;
  width: 100%;
`;

const Switch = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 20px;
  background: rgba(128, 128, 128, 0.075);
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.274);
  position: relative;
  width: 100%;

  @media ${SM_DOWN} {
    padding: 10px;
    font-size: 12px;
  }

  ${(props) =>
    props.active &&
    `
    background: white;
    border-bottom: 1px solid transparent;
  
    &::before {
      content: "";
      display: block;
      position: absolute;
      top: -5px;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% + 2px);
      height: 5px;
      background: #f08b62;
    }
    
     `}
`;
type TabSwitchProps = {
  toggleTab: (index: number) => void;
  toggleState: number;
};

const TabSwitch: React.FC<TabSwitchProps> = ({ toggleTab, toggleState }) => {
  return (
    <BlocTabs>
      <Switch active={toggleState === 1} onClick={() => toggleTab(1)}>
        Log in
      </Switch>
      <Switch active={toggleState === 2} onClick={() => toggleTab(2)}>
        Sign up
      </Switch>
      <Switch active={toggleState === 3} onClick={() => toggleTab(3)}>
        Reset password
      </Switch>
    </BlocTabs>
  );
};

export default TabSwitch;

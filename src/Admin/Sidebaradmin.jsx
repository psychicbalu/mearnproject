import React, { useEffect, useState } from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import Createque from './pages/Createque';
import Editques from './pages/Editques';
import { GetQuestions } from '../Services/Allapi';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

function Sidebaradmin() {
  const [questions, setQuestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState('createque');
  const [expanded, setExpanded] = useState(false);
  const [mode, setMode] = useState('create'); // State to keep track of whether creating or editing

  const Checkquestion = () => {
    GetQuestions().then((res) => {
      setMode('edit');
      setQuestions(res.data);
      console.log(res.data);
    });
  }

  // Function to render selected component based on mode
  const renderSelectedComponent = () => {
    if (mode === 'create') {
      return <Createque />;
    } else if (mode === 'edit') {
      return <Editques questions={questions}  />;
    }
    return null;
  };

  useEffect(() => {
    Checkquestion();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <SideNav
        expanded={expanded}
        onSelect={(selected) => {
          setSelectedItem(selected);
          if (selected === 'createque') {
            setMode('create'); // Switch to create mode when "Create Question" is selected
          } else if (selected === 'editque') {
            setMode('edit'); // Switch to edit mode when "Edit Question" is selected
          }
        }}
        onToggle={(expanded) => setExpanded(expanded)}
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="createque">
          <NavItem eventKey="createque">
            <NavIcon>
              <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
              Create Question
            </NavText>
          </NavItem>
          <NavItem eventKey="editque">
            <NavIcon>
              <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
              Edit Question
            </NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>

      <div style={{ flex: 1, marginLeft: expanded ? '240px' : '64px', transition: 'margin-left 0.2s' }}>
        {renderSelectedComponent()}
      </div>
    </div>
  );
}

export default Sidebaradmin;

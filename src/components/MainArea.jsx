import React from 'react';
import PropTypes from 'prop-types';
import Column from './Column';

const MainArea = () => {
  return (
    <main>
      <div className="main-area-content">
        <Column
          title="To Do"
          cards={[
            { title: 'Hallo', id: 0 },
            { title: 'Hola', id: 1 },
            { title: 'Gulp', id: 2 }
          ]}
        />
        <Column
          title="In Progress"
          cards={[
            { title: 'Start', id: 3 },
            { title: 'Stop', id: 4 }
          ]}
        />
        <Column
          title="Done"
          cards={[
            { title: 'Tada', id: 5 }
          ]}
        />
      </div>
    </main>
  );
};

MainArea.propTypes = {

};

export default MainArea;

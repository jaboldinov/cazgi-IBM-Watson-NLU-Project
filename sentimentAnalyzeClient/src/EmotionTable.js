import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
      return (  
        <div>
          <table className="table table-bordered">
            <tbody>
            {this.props.map((i, j) => 
                (<tr><td>{i}</td><td>{j}</td></tr>)
                )
            }
            </tbody>
          </table>
          </div>
          );
        }
}
export default EmotionTable;

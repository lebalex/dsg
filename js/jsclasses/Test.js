//import React, {Component} from 'react'
//import { Table } from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
//import 'node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
export class Test extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items:[]

    };
  }
    componentDidMount() {
        fetch("/includes/get_data.php?x=get_orders")
      .then(res => res.json())
      .then(
        (result) => {
            console.log(result)
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

  }
  
    
  render() {
    const { error, isLoaded } = this.state;
    const options = {

        sizePerPage: 3,
        onRowClick: function(row) {
            alert(`You click row id: ${row.name}`);
          },
          onRowDoubleClick: function(row) {
            alert(`You double click row id: ${row.email}`);
          }
    }

        return (
            
<div>
        <BootstrapTable version='4'
          data={ this.state.items } options={ options } 
          pagination>
          <TableHeaderColumn dataField='id' isKey width='100'>Product ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name' width='250'>Product Name</TableHeaderColumn>
          <TableHeaderColumn dataField='email'>Product Price</TableHeaderColumn>
        </BootstrapTable>
      </div>

        );
    
}
    }
    ReactDOM.render(<Test />,    document.getElementById('editableField'));
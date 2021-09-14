import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow.js";
import EditableRow from "./components/EditableRow.js";
import  FindPipette from "./calculator";


const App = () => {
  var p1000_ctr = 0
  var p300_ctr = 0
  var m300_ctr = 0
  var p20_ctr = 0
  var m20_ctr = 0
  var pip
  var max_pip1
  var max_pip2

  function protocol_pipettes(){
    var pipette_count = {'P1000 Single-Channel': p1000_ctr, 'P300 Single-Channel':p300_ctr, 'P300 Multi-Channel':m300_ctr, 'P20 Single-Channel':p20_ctr, 'P20 Multi-Channel':m20_ctr}


    if (pipette_count['P20 Single-Channel'] > 0) {
      var max_pip1 = 'P20 Single-Channel'
    } else if (pipette_count['P20 Multi-Channel'] > 0){
      var max_pip1 = 'P20 Multi-Channel'
    } else {
      var max_pip1 = Object.keys(pipette_count).reduce(
                      function(a, b){ return pipette_count[a] > pipette_count[b] ? a : b });
    }
    let pip1 = max_pip1;
    delete pipette_count[pip1];

    var remaining_pipettes = 0
    for (let i in pipette_count) {
      if (pipette_count[i] > 0){
        remaining_pipettes += 1
      }
    }

    if (remaining_pipettes == 0){
          var max_pip2 = ''
        }else{
          if (pipette_count['P20 Single-Channel'] > 0){
            var max_pip2 = 'P20 Single-Channel'
          } else if (pipette_count['P20 Multi-Channel'] > 0){
            var max_pip2 = 'P20 Multi-Channel'
          } else {
            var max_pip2 = Object.keys(pipette_count).reduce(
                            function(a, b){ return pipette_count[a] > pipette_count[b] ? a : b });
          }
        }

    let pip2 = max_pip2
    if (pip2 == ''){
      let pipette_rec = [pip1, ' pipette']
      return pipette_rec;
    }else{
      let pipette_rec = [pip1, ', and ', pip2, ' pipettes']
      return pipette_rec;
    }


  }






  const [contacts, setContacts] = useState(data);


  const [addFormData, setAddFormData] = useState({
    liquid_name: "",
    transfer_vol: "",
    eight_tips: "",
    change_tips: "",
    filter_tips: "",
  });

  const [editFormData, setEditFormData] = useState({
    liquid_name: "",
    transfer_vol: "",
    eight_tips: "",
    change_tips: "",
    filter_tips: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const liquidRecommendedPipette = {}
  contacts.forEach((contact) => {
    const castedContact = {
      ...contact,
      transfer_vol: Number(contact.transfer_vol),
    }
    liquidRecommendedPipette[contact.liquid_name] = FindPipette(contact)
  })
  console.log(liquidRecommendedPipette)


  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      liquid_name: addFormData.liquid_name,
      transfer_vol: addFormData.transfer_vol,
      eight_tips: addFormData.eight_tips,
      change_tips: addFormData.change_tips,
      filter_tips: addFormData.filter_tips,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      liquid_name: editFormData.liquid_name,
      transfer_vol: editFormData.transfer_vol,
      eight_tips: editFormData.eight_tips,
      change_tips: editFormData.change_tips,
      filter_tips: editFormData.filter_tips,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      liquid_name: contact.liquid_name,
      transfer_vol: contact.transfer_vol,
      eight_tips: contact.eight_tips,
      change_tips: contact.change_tips,
      filter_tips: contact.filter_tips,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };


  return ( <div className="app-container">
  <form onSubmit={handleEditFormSubmit}>
    <table>
      <thead>
        <tr>
          <th>Liquid Name</th>
          <th>Transfer Volume (ul)</th>
          <th>Number of tips per transfer wholly divisible by 8?</th>
          <th>Do tips have to be changed (single vs. multi-dispense)?</th>
          <th>Filter Tips (Y/N)?</th>
        </tr>
      </thead>
      <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
      <h2>Add a Liquid</h2>
        <form onSubmit={handleAddFormSubmit}>
          <input
            type="text"
            name="liquid_name"
            required="required"
            placeholder="Liquid"
            onChange={handleAddFormChange}
          />
          <input
            type="text"
            name="transfer_vol"
            required="required"
            placeholder="Transfer Vol (ul)"
            onChange={handleAddFormChange}
          />
          <select name="eight_tips" id="eight_tips" onChange={handleAddFormChange}>
            <option value="" disabled selected>Can use 8 tips/transfer?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
           </select>
          <select name="change_tips" id="change_tips" onChange={handleAddFormChange}>
            <option value="" disabled selected>Change Tips?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
           </select>
           <select name="filter_tips" id="filter_tips" onChange={handleAddFormChange}>
             <option value="" disabled selected>Filter Tips?</option>
             <option value="Yes">Yes</option>
             <option value="No">No</option>
            </select>

          <button type="submit">Add</button>
        </form>

        {Object.entries(liquidRecommendedPipette).map(liquidInfo => {
          const liquidName = liquidInfo[0];
          const pipetteText = liquidInfo[1];


          if (pipetteText.includes('P1000')){
            p1000_ctr += 1

          }
          if (pipetteText.includes('P300 Multi')){
            m300_ctr += 1

          }
          if (pipetteText.includes('P300 Single')){
            p300_ctr += 1

          }
          if (pipetteText.includes('P20 Multi')){
            m20_ctr += 1

          }
          if (pipetteText.includes('P20 Single')){
            p20_ctr += 1

          }


        return <h3>
          <form>
            <table>
              <thead>
                <tr>
                  <th>{liquidName}</th>
                  <th>Recommended Pipette</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <React.Fragment>
                    <td></td>
                    <td>{pipetteText}</td>
                    </React.Fragment>
                  </tr>
                  </tbody>
                </table>
              </form>
            </h3>


            })}

            <h4>
              <form>
                <table>
                  <thead>
                    <tr>
                      <th>Protocol Pipettes: </th>
                      <th>{protocol_pipettes()}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                        <React.Fragment>
                        </React.Fragment>
                      </tr>
                      </tbody>
                    </table>
                  </form>
                </h4>

        </div>
      );
    };


export default App;

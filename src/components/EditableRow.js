import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  console.log('in editable row')
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Liquid name"
          name="liquid_name"
          value={editFormData.liquid_name}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="number"
          required="required"
          placeholder="Transfer Volume"
          name="transfer_vol"
          value={editFormData.transfer_vol}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Can use 8 tips/transfer?"
          name="eight_tips"
          value={editFormData.eight_tips}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Change Tips?"
          name="change_tips"
          value={editFormData.change_tips}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Filter Tips?"
          name="filter_tips"
          value={editFormData.filter_tips}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;

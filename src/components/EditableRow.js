import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
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
      <select name="eight_tips" id="eight_tips" onChange={handleEditFormChange}>
        <option value="" disabled selected>Can use 8 tips/transfer?</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
       </select>
      </td>
      <td>
      <select name="change_tips" id="change_tips" onChange={handleEditFormChange}>
        <option value="" disabled selected>Change Tips?</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
       </select>
      </td>
      <td>
      <select name="filter_tips" id="filter_tips" onChange={handleEditFormChange}>
        <option value="" disabled selected>Filter Tips?</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
       </select>
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

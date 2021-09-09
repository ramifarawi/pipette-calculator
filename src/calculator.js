class AssignPipette {
  constructor(transfer_vol, eight_tips, change_tips, filter_tips){
    this.transfer_vol = transfer_vol;
    this.eight_tips = eight_tips;
    this.change_tips = change_tips;
    this.filter_tips = filter_tips;
  }
}
var liquid1 = new AssignPipette(600, 'Yes', 'No', 'Yes');

function FindPipette(liquid){
  if (liquid.transfer_vol <= 20) {             // P20 SINGLE CHANNEL PIPETTE
    if (liquid.eight_tips == 'Yes'){
      return('P20 Multi-Channel Pipette')
    }
    else if (liquid.eight_tips == 'No') {
      return('P20 Single-Channel Pipette')
    }
  }

  else if (liquid.transfer_vol > 20) {    // P300 SINGLE CHANNEL PIPETTE

    if (liquid.transfer_vol < 100) {
      if (liquid.eight_tips == 'Yes') {
        return('P300 Multi-Channel Pipette')
      }

      else if (liquid.eight_tips == 'No'){
        return('P300 Single-Channel Pipette')
      }
    }

    else if (liquid.transfer_vol > 100) {
      if (liquid.filter_tips == "Yes") {
        var tip_cap_300 = 200
      }
      else {
        var tip_cap_300 = 300
      }

      // Multi-dispense P1000 vs P300 Multi, also accounts for if P300 multi
      // has multiple transfers with P1000
      if (liquid.change_tips == "No"
          && liquid.eight_tips == "Yes") {
            let num_transfers_1000 = Math.ceil(8/Math.floor(1000/liquid.transfer_vol))
            let num_transfers_300 = Math.ceil(liquid.transfer_vol/tip_cap_300)
            if (num_transfers_1000 > num_transfers_300){
              return('P300 Multi-Channel Pipette')
            }
            else if (num_transfers_1000 < num_transfers_300){
              return('P1000 Single-Channel Pipette')
            }
            else if (num_transfers_1000 == num_transfers_300){
              return('P300 Multi-Channel Pipette -OR- P1000 Single-Channel Pipette')
            }
      }

      // P300 Single and P1000 for single-dispense
      if (liquid.change_tips == "Yes"
          && liquid.eight_tips == "No") {
            if (liquid.transfer_vol <= tip_cap_300) {
          return('P300 Single-Channel or P1000 Single-Channel Pipette')
        }
        else {
          return('P1000 Single-Channel Pipette')
        }
      }


      // P300 Multi vs P1000 with Multi-Dispense
      if (liquid.change_tips == "Yes"
          && liquid.eight_tips == "Yes") {
              return('P300 Multi-Channel Pipette')
            }
      // P300 Single and P1000 for multi-dispense
      if (liquid.change_tips == "No"
          && liquid.eight_tips == "No") {
              return('P1000 Single-Channel Pipette')
      }

      if (liquid.change_tips == "No" && liquid.eight_tips == "Yes") {
        let num_transfers_1000 = Math.floor(1000/liquid.transfer_vol)
        let num_transfers_300 = Math.floor(tip_cap_300/liquid.transfer_vol)
      }
    }
  }

  else {
    return('P1000 Single-Channel Pipette')
  }

}
console.log(FindPipette(liquid1))
// module.exports = {find}
export default FindPipette;

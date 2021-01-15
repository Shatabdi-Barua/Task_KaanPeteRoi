const csv= require('csv-parser')
const fs =  require('fs')

const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const csvWriter = createCsvWriter({
    header: ['node1', 'node2', 'weight'],
    path: 'output.csv'
});

// const results = []; // this is for debugging
let common_time = {};// keep the volunteers with overlapping shifts
// let volunteers = [];//this is for debugging
let weightedGraph = {}; //keep the graph here

fs.createReadStream('Data.csv') //take csv file
.pipe(csv({}))
.on('data',(data) => {

	// results.push(data);
	// volunteers.push(data.volunteerName); //saving all volunteer name to a list

	if (common_time.hasOwnProperty(data.date)){ //if there already exists entry for a date
		if (common_time[data.date].hasOwnProperty(data.shift)){ //if there already exists entry for a date and shift

			//add to a weighted graph (adjlist) here

			common_time[data.date][data.shift].forEach( 
			//for each of the volunteers that has already existed for a certain date and shift,
			//add a node for the new volunteer
				(volunteer) => {
					

					//because a -> b and b -> a are the same we'll count them as one
					let fromNode, toNode;
					if (volunteer > data.volunteerName) {
						fromNode = volunteer;
						toNode = data.volunteerName;
					}
					else{
						fromNode = data.volunteerName;
						toNode = volunteer;
					} //keeping the record such that the lexicographically larger name is the fromNode

					if (!weightedGraph.hasOwnProperty(fromNode)){
						weightedGraph[fromNode] = {};
					}
					if (!weightedGraph[fromNode].hasOwnProperty(toNode)){
						weightedGraph[fromNode][toNode] = 1;						
					}
					else{
						weightedGraph[fromNode][toNode] += 1;
					}

				}
			);


			common_time[data.date][data.shift].add(data.volunteerName);
		}

		else{ //if no previous cases of a day and a shift exists
			common_time[data.date][data.shift] = new Set();
			common_time[data.date][data.shift].add(data.volunteerName);
		}
	
	}
	else{ //if no previous cases of same day exists
		common_time[data.date]= {};
		common_time[data.date][data.shift] = new Set();
		common_time[data.date][data.shift].add(data.volunteerName);
	}


})
.on('end', ()=> {
	const connections = [];

	// update connections to write to csv
	Object.keys(weightedGraph).forEach(
		(fromNode) => {

			Object.keys(weightedGraph[fromNode]).forEach(
				(toNode) => {
					connections.push([fromNode, toNode, weightedGraph[fromNode][toNode]]);
				}
			)
		}
	);


	//write connections to csv
	csvWriter.writeRecords(connections);


	// console.log(results[0]);
	// console.log({volunteers})
	// console.log(common_time)
	// console.log({weightedGraph})
	// console.log({connections})

});


// Returns the next generation for the given data matrix
function updateMatrix(mat)
{
    let newMat = deepCopyMatrix(mat);
    for (var i = 0; i < mat.length; i++) {
        for (var j = 0; j < mat[0].length; j++) {
            let population = sumNeighbours(mat, i, j)
            if (population < 2 || population > 3) {
                newMat[i][j] = 0;
            } else if (population == 3) {
                newMat[i][j] = 1;
            }
        }
    }
    return newMat;
}

onmessage = function(e) {
    var date = new Date();
    var startTime = date.getTime();
    while (date.getTime() - startTime() < 1000) {
        console.log('Not ready yet');
    }
    postMessage(updateMatrix(e.data));
}




const shuffle = function(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const chunk = (arr, size) =>
  arr.length > size
    ? [arr.slice(0, size), ...chunk(arr.slice(size), size)]
    : [arr];


/**
 * Create random distributed groups
 * @param {string[]} items - input strings
 * @param {int} amount
 * @param {int} groupSize
 * @returns {Array.<string[]>}
 */
const createRandomDistributedGroups = (items, amount, groupSize) => {

  const poolSize = Math.floor(items.length / groupSize);
  const numPools = Math.ceil(amount/poolSize);

  let allGroups = [];

  for(let i=0; i<numPools; i++) {

    let acceptableShuffle = true;
    let workingCopy;
    do {
      workingCopy = shuffle([...items]);

      if(allGroups.length > 0)  {
        const lastGroup = allGroups[allGroups.length -1];
        const firstGroup = workingCopy.slice(0, lastGroup.length);

        acceptableShuffle = firstGroup.every((item) => {
          return ! lastGroup.includes(item);
        });
      }
    } while(!acceptableShuffle);

    const groups = chunk(workingCopy, groupSize);
    if(groups[groups.length -1].length < groupSize) groups.pop();

    allGroups = [...allGroups, ...groups];
  }

  return allGroups.slice(0, amount);

}

module.exports = createRandomDistributedGroups;

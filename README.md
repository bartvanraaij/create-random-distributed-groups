# Create random distributed groups
_Create random distributed groups_ is a utility to create distributed random groups of a list of input items.
By "distributed random" it means that:
- Items are distributed as evenly as possible;
- Items are not duplicated inside a group;
- Items are never assigned after each other.

This is for example useful if you want to create randomly assigned groups of people but do not want
duplicated within a group and also don't want people to be assigned two times in a row.

## Usage
```js
const createRandomDistributedGroups = require('create-random-distributed-groups');
const names = ['Bert','Ernie','Elmo','Grover','Kermit','Oscar'];
const groups = createRandomDistributedGroups(names, 10, 2);
console.log(groups);
```

Output will be, for example:
```
[
  [ 'Grover', 'Bert' ],
  [ 'Oscar', 'Ernie' ],
  [ 'Elmo', 'Kermit' ],
  [ 'Ernie', 'Bert' ],
  [ 'Grover', 'Elmo' ],
  [ 'Oscar', 'Kermit' ],
  [ 'Bert', 'Grover' ],
  [ 'Kermit', 'Oscar' ],
  [ 'Ernie', 'Elmo' ],
  [ 'Grover', 'Kermit' ]
]
```

## CLI Usage
The CLI reads from stdin, so you can use pipes and input redirection to provide the input data.
For example, given a file `input.txt` with the contents:
```
Bert
Ernie
Elmo
Grover
Kermit
Oscar
```
```shell
npx create-random-distributed-groups --amount=10 --group-size=2 < input.txt
```
Output will be, for example:
```
Oscar Bert
Elmo Ernie
Kermit Grover
Ernie Bert
Kermit Grover
Oscar Elmo
Ernie Grover
Bert Oscar
Kermit Elmo
Grover Bert
```

By default the CLI splits input on newlines (`\n` character) but you can use the
`--separator` parameter to change that, for example:
```shell
echo  "Bert,Ernie,Elmo,Oscar,Kermit,Grover" | npx create-random-distributed-groups --amount=10 --group-size=2 --separator=","
```

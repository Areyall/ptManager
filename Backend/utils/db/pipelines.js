const matchStagePipe = [
  {
    $match: { createdBy: createdBy },
  },
];

module.exports = matchStagePipe;

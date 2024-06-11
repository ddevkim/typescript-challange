function getPermutations(array) {
  const result = [];

  function permute(remained, acc = []) {
    if (remained.length === 0) {
      result.push(acc);
    } else {
      for (let i = 0; i < remained.length; i++) {
        let curr = [...remained];
        let picked = curr.splice(i, 1);
        console.log(picked, curr, acc);

        permute([...curr], acc.concat(picked));
      }
    }
  }

  permute(array);

  return result;
}

function getPerm(array) {
  const result = [];

  function perm(remained, acc = []) {
    // base 조건
    if (remained.length === 0) {
      result.push(acc);
      return;
    }

    // 재귀 조건
    for (let i = 0; i < remained.length; i++) {
      const curr = [...remained];
      const picked = curr.splice(i, 1);
      perm([...curr], acc.concat(picked));
    }
  }

  perm(array);

  return result;
}

(async () => {
  const res = getPerm([1, 2, 3, 4]);

  console.log("res", res);
})();

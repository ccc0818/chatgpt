export const getQueryObj = () => {
  let query = window.location.search;
  if (query === undefined)
    return {};

  query = query.slice(1);
  let arr = query.split('&');
  let obj = {};
  arr.forEach(i => {
    const [key, val] = i.split('=');
    if (key === 'name' || key === 'endtime')
      obj[key] = decodeURI(val);
    else
      obj[key] = val;
  })
  return obj;
}

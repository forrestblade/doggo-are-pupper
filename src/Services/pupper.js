import "isomorphic-fetch";

export const fetchPuppers = (puppername) => {
    return puppername === ''
    ? Promise.reject({error: 'no puppers?! whaaattt?!'})
    : fetch(`https://dog.ceo/api/breed/${puppername}/images`)
        .then(resp => resp.json())
        .then(data => data)
        .catch(err => ({error: 'bork bork no network'}))
}
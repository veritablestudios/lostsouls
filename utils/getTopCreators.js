export const getTopCreators = (nfts) => {
  return Object.entries(
    nfts.reduce((creatorObject, nft) => {
      (creatorObject[nft.seller] = creatorObject[nft.seller] || []).push(nft);
      return creatorObject;
    }, {})
  )
    .map(([seller, nfts]) => ({
      seller,
      sum: nfts.reduce((total, nft) => total + Number(nft.price), 0),
    }))
    .sort((a, b) => b.sum - a.sum);
};

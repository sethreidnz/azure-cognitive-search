const {
  Aborter,
  BlobURL,
  BlockBlobURL,
  ContainerURL,
  ServiceURL,
  StorageURL,
  SharedKeyCredential
} = require("@azure/storage-blob");

const getContainerUrl = (account, accountKey, containerName) => {
  const sharedKeyCredential = new SharedKeyCredential(account, accountKey);
  const pipeline = StorageURL.newPipeline(sharedKeyCredential);
  const serviceURL = new ServiceURL(
    `https://${account}.blob.core.windows.net`,
    pipeline
  );
  return ContainerURL.fromServiceURL(serviceURL, containerName);
}

const createTextBlob = async (account, accountKey, containerName, content, blobName) => {
  const containerURL = getContainerUrl(account, accountKey, containerName);
  const blobURL = BlobURL.fromContainerURL(containerURL, blobName);
  const blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);
  return await blockBlobURL.upload(Aborter.none, content, content.length);
};

module.exports = {
    createTextBlob
};

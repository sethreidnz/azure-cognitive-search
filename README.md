# Youtube Cognitive Search

This repository contains the source code for the YouTube scrapping Azure Search based Youtube Cognitive Search application. This was created as a demo for presenting the capabilities of [Cognitive Search](https://docs.microsoft.com/en-us/azure/search/cognitive-search-concept-intro) by giving your a full faceted seach experience over Joe Rogans YouTube podcasts.

## What's included?

The project is made up of two main parts:

- [Client](/src/client) - A React.js app that provides the user interface over the Azure Search index
- [Functions](/src/functions) - An [Azure Functions]() project that contains a timer function capable of syncing all of Joe Rogans podcasts on YouTube to a file in [Azure Blob Storage]() so that Azure Search can index it.

There are also other useful folders that would help you get the demo running in your own environment.

- [Sample Data](/resources/data) - The playlists.json that contains all of the podcasts as of PST 2019-06-23 that can be used to create a search index
- [Postman Collection](/resources/postman) - The postman collection and environment exports that you need to setup an index
- An Azure Search instance - [Create an Azure Search service in the portal](https://docs.microsoft.com/en-us/azure/search/search-create-service-portal)
- Azure Storage Account with a container - [Create a storage account](https://docs.microsoft.com/en-us/azure/storage/common/storage-quickstart-create-account?tabs=azure-portal)
- Azure Cognitive Service Account - [Create a Cognitive Services account in the Azure portal](https://docs.microsoft.com/en-us/azure/cognitive-services/cognitive-services-apis-create-account)

## Pre-requisites

First things first you will need the following:

- [NodeJS >= 8](https://nodejs.org/en/download/)
- [Visual Studio Code](https://visualstudio.microsoft.com/) - With the Azure Functions extension for [Visual Studio Code](https://code.visualstudio.com/tutorials/functions-extension/getting-started)
- [Postman](https://www.getpostman.com/downloads/) - A free API development app that allows you to import the requests you need to create the Azure Search index over Joe Rogan's podcasts

## Getting started

There are a number of tasks involved in getting the entire environment setup. If you just want to setup the Azure Cognitive Search instance then it is the first section. You can then setup as much as you like of the rest.

### Upload the data file

First you need to upload the file `resources/data/podcasts.json` to your Storage Container, if you don't know how then you can use this article [Upload, download, and list blobs with the Azure portal](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal).

### Setting up Azure search

This project includes a Postman collection that contains all the requests that I used to create this demo. These can be found in the folder `/resources/postman` and you will need to import the collection file `Youtube Channel Cognitive Search.postman_collection.json`. Then add the Postman environment file  `Youtube Channel Cognitive Search.postman_environment.json` (see [this article to learn about Postman Environments](https://learning.getpostman.com/docs/postman/environments_and_globals/manage_environments/)).

You need to set the following environment variables in Postman:

- `AzureSearchKey` - Your Azure Search key
- `CognitiveServicesKey` - Your Azure Cognitive Services key
- `AzureStorageConnectionString` - Your Azure Storage connection string
- `AzureStorageContainerName` - The name of your Azure Storage container

Then you can run the following Postman requests **in this order**:

- Azure Search - Create Skillset
- Azure Search - Create Datasource
- Azure Search - Create Index
- Azure Search - Create Indexer

### Installing npm dependencies

Both the client and the function projects use NodeJS and need to have their npm packages installed.

For the client:

``` bash
cd src/client
npm install
```

For the functions:

```
cd src/functions
npm install
```

## Getting started - Client

To run the client run:

``` bash
cd src/client
npm start
```

To make a production build run:

```
cd src/client
npm run build # will create a /build folder with the output
```

## Getting started - Functions

Since its a timer app I have set it up to run on startup. You can run the function app by doing the following to open the foloder in VS Code and then press F5 to debug:

``` bash
cd src/functions
code .
```

To deploy to function read [Deploy to Azure using Azure Functions](https://code.visualstudio.com/tutorials/functions-extension/getting-started).
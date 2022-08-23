param location string = resourceGroup().location
param serverFarmName string = 'profilesite${uniqueString(resourceGroup().id)}'
param siteName string = 'profilesite${uniqueString(resourceGroup().id)}'

resource serverFarm 'Microsoft.Web/serverfarms@2022-03-01' = {
  location: location
  sku: {
    tier: 'Basic'
    name: 'B1'
  }
  name: serverFarmName
  kind: 'linux'
  properties: {
    reserved: true
    zoneRedundant: false
  }
}

resource site 'Microsoft.Web/sites@2022-03-01' = {
  location: location
  name: siteName
  properties: {
    serverFarmId: serverFarm.id
    siteConfig: {
      linuxFxVersion: 'DOTNETCORE|6.0'
      alwaysOn: false
      ftpsState: 'FtpsOnly'
    }
  }
}

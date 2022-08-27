param location string = resourceGroup().location
param serverFarmName string = 'profilesite-${uniqueString(resourceGroup().id)}'
param siteName string = 'profilesite-${uniqueString(resourceGroup().id)}-web'
param siteHostName string = 'www.aduzik.com'
param clientId string
@secure()
param clientSecret string
param domainVerificationId string
param networkName string = 'profilesite-${uniqueString(resourceGroup().id)}'
param sqlServerName string = 'profilesite-${uniqueString(resourceGroup().id)}-data'
param databaseName string = 'profilesite'
param sqlAdminUser string
param sqlAdminLogin string

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
    virtualNetworkSubnetId: vnet.properties.subnets[0].id
    httpsOnly: true
    customDomainVerificationId: domainVerificationId
    siteConfig: {
      linuxFxVersion: 'DOTNETCORE|6.0'
      alwaysOn: false
      ftpsState: 'FtpsOnly'
      vnetRouteAllEnabled: true
      appSettings: [
        {
          name: 'AzureAd__TenantId'
          value: tenant().tenantId
        }
        {
          name: 'AzureAd__ClientId'
          value: clientId
        }
        {
          name: 'AzureAd__ClientSecret'
          value: clientSecret
        }
        {
          name: 'ConnectionStrings__SqlServerBlog'
          value: 'Server=tcp:${sqlServerName}${environment().suffixes.sqlServerHostname};Authentication=Active Directory Managed Identity;Database=${databaseName};'
        }
      ]
    }
  }
  identity: {
    type: 'SystemAssigned'
  }

  resource hostnames 'hostNameBindings' = {
    name: siteHostName
    properties: {
      hostNameType: 'Verified'
      sslState: 'SniEnabled'
      customHostNameDnsRecordType: 'CName'
    }
  }
}

resource sqlServer 'Microsoft.Sql/servers@2022-02-01-preview' = {
  name: sqlServerName
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    administrators: {
      administratorType: 'ActiveDirectory'
      azureADOnlyAuthentication: true
      principalType: 'User'
      sid: sqlAdminUser
      login: sqlAdminLogin
      tenantId: tenant().tenantId
    }
  }

  resource sqlVnet 'virtualNetworkRules' = {
    name: 'default'
    properties: {
      virtualNetworkSubnetId: vnet.properties.subnets[0].id
      ignoreMissingVnetServiceEndpoint: true
    }
  }

  resource database 'databases' = {
    location: location
    name: databaseName
    sku: {
      tier: 'Basic'
      name: 'Basic'
    }
  }
}

resource vnet 'Microsoft.Network/virtualNetworks@2022-01-01' = {
  name: networkName
  location: location
  properties: {
    addressSpace: {
      addressPrefixes: [
        '10.0.0.0/16'
      ]
    }
    subnets: [
      {
        name: 'default'
        properties: {
          addressPrefix: '10.0.0.0/24'
          delegations: [
            {
              name: 'default'
              properties: {
                serviceName: 'Microsoft.Web/serverFarms'
              }
            }
          ]
          serviceEndpoints: [
            {
              service: 'Microsoft.Sql'
            }
          ]
        }
      }
    ]
  }
}

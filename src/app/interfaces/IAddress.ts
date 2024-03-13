export interface IAddress {
  place_id: number
  licence: string
  osm_type: string
  osm_id: number
  lat: number
  lon: number
  category: string
  type: string
  place_rank: number
  importance: number
  addresstype: string
  name: string
  display_name: string
  address: AddressData;
  boundingbox: string[]
}

export interface AddressData {
  town: string
  province: string
  state: string
  postcode: string
  country: string
  country_code: string

}

import axiosInstance from '../shared/axios-config'
import axios from 'axios'

export enum FileRoute {
  getFileUploadLink = '/v0/files/file-upload-link'
}

export interface AssetInfo  {
  access_mode: string;
  asset_folder: string;
  asset_id: string;
  bytes: number;
  created_at: string;
  display_name: string;
  etag: string;
  format: string;
  height: number;
  original_filename: string;
  placeholder: boolean;
  public_id: string;
  resource_type: string;
  secure_url: string;
  signature: string;
  tags: string[];
  type: string;
  url: string;
  version: number;
  version_id: string;
  width: number;
}

export async function uploadFile(file: File):Promise<AssetInfo> {
  const uploadLink = await axiosInstance.get<{ url: string }>(
    FileRoute.getFileUploadLink
  )
  const ImgeUploadUrl = uploadLink.data.url
  const formData = new FormData()
  formData.append('file', file)
  formData.append("upload_preset", "org_images");
  const response = await axios.post<AssetInfo>(ImgeUploadUrl, formData, {
    withCredentials: false,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

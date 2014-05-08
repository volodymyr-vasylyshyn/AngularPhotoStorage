class PhotoSerializer < ActiveModel::Serializer
  attributes :id, :title, :path, :preview, :medium
  def path
    object.image.url
  end

  def preview
    object.image.thumb.url
  end

  def medium
    object.image.medium.url
  end
end

class AlbumSerializer < ActiveModel::Serializer
  has_many :photos
  attributes :id, :title, :user_id, :photos_count, :album_cover

  def album_cover
    object.photos.size > 0 ? object.photos.first.image.medium.url : 'album.png'
  end
end

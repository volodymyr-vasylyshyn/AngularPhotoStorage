class AlbumSerializer < ActiveModel::Serializer
  has_many :photos
  attributes :id, :title, :user_id, :photos_count
end

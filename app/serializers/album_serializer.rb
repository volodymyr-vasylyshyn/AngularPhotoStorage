class AlbumSerializer < ActiveModel::Serializer
  attributes :id, :title, :user_id, :photos_count
end

class Photo < ActiveRecord::Base
  mount_uploader :image, FileUploader
  belongs_to :album, counter_cache: true
  belongs_to :imageable, polymorphic: true
  def owner
    self.album.user
  end
end

module Api::V1
  class PhotosController < ApiController
    respond_to :json
    before_action :set_target, only: [:create]
    before_action :set_photo, only: [:destroy]

    def index
      respond_with Photo.paginate(page: params[:page], per_page: 12)
    end

    def create
      @photo = @target.photos.create(photo_params)
      @photo.save & render( json: @photo )
    end

    def destroy
      @photo.destroy
      respond_to do |format|
        format.json { head :no_content }
      end
    end

    private

    # Private:
    # Creates whitelist for parameters from request.
    def set_photo
      @photo = Photo.find params[:id]
    end
    def set_target
      @target = params[:targetType].classify.constantize.find(params[:targetId])
    end
    def photo_params
      params.permit(:image)
    end
  end
end

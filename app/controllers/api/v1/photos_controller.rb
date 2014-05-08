module Api::V1
  class PhotosController < ApiController
    respond_to :json
    before_action :set_target, only: [:create]

    def index
      respond_with Photo.paginate(page: params[:page], per_page: 10)
    end

    def create
      @photo = @target.photos.create(photo_params)
      @photo.save & render( json: @photo )
    end

    private

    # Private:
    # Creates whitelist for parameters from request.
    def set_target
      @target = params[:targetType].classify.constantize.find(params[:targetId])
    end
    def photo_params
      params.permit(:image)
    end
  end
end

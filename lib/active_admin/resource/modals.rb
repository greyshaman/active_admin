require 'active_admin/helpers/optional_display'

module ActiveAdmin

  class Resource
    module Modals

      def initialize(*args)
        super
        add_default_modal_sections
      end

      def modal_sections
        @modal_sections ||= []
      end

      def clear_modal_sections!
        @modal_sections = []
      end

      def modal_sections_for(action, render_context = nil)
        modal_sections.select{|section| section.display_on?(action, render_context) }
      end

      def modal_sections?
        !!@modal_sections && @modal_sections.any?
      end

      private

      def add_default_modal_sections
        #self.modal_sections << ActiveAdmin::ModalSection.new(:filters, :only => :index) do
        #  active_admin_filters_form_for assigns["search"], filters_config
        #end
      end

    end
  end

end

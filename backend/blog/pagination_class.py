from rest_framework.pagination import PageNumberPagination

class BlogPagination(PageNumberPagination):
    page_size = 4
    page_size_query_param = 'item_count'
    max_page_size = 100
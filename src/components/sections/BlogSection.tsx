import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import FooterInfo from '@/components/ui/FooterInfo';
import { blogPosts, BlogPost } from '@/data/blog';

const BlogSection = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Все', icon: 'Layout' },
    { id: 'советы', label: 'Советы', icon: 'Lightbulb' },
    { id: 'новости', label: 'Новости', icon: 'Newspaper' },
    { id: 'обзоры', label: 'Обзоры', icon: 'Star' },
    { id: 'инструкции', label: 'Инструкции', icon: 'Book' }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors = {
      'советы': 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400',
      'новости': 'bg-green-500/10 text-green-600 border-green-500/20 dark:bg-green-500/20 dark:text-green-400',
      'обзоры': 'bg-purple-500/10 text-purple-600 border-purple-500/20 dark:bg-purple-500/20 dark:text-purple-400',
      'инструкции': 'bg-orange-500/10 text-orange-600 border-orange-500/20 dark:bg-orange-500/20 dark:text-orange-400'
    };
    return colors[category as keyof typeof colors] || '';
  };

  if (selectedPost) {
    return (
      <div className="space-y-6 animate-fade-in">
        <Card>
          <CardHeader>
            <Button 
              variant="ghost" 
              onClick={() => setSelectedPost(null)}
              className="mb-4 w-fit"
            >
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Назад к статьям
            </Button>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <Badge className={getCategoryColor(selectedPost.category)} variant="outline">
                {selectedPost.category}
              </Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Calendar" size={14} />
                {new Date(selectedPost.date).toLocaleDateString('ru-RU', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={14} />
                {selectedPost.readTime} мин чтения
              </div>
            </div>
            <CardTitle className="text-3xl">{selectedPost.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <img 
              src={selectedPost.image} 
              alt={selectedPost.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="prose prose-gray dark:prose-invert max-w-none">
              {selectedPost.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('# ')) {
                  return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{paragraph.slice(2)}</h1>;
                }
                if (paragraph.startsWith('## ')) {
                  return <h2 key={index} className="text-2xl font-semibold mt-6 mb-3">{paragraph.slice(3)}</h2>;
                }
                if (paragraph.startsWith('### ')) {
                  return <h3 key={index} className="text-xl font-semibold mt-4 mb-2">{paragraph.slice(4)}</h3>;
                }
                if (paragraph.startsWith('- ')) {
                  return <li key={index} className="ml-6">{paragraph.slice(2)}</li>;
                }
                if (paragraph.trim() === '') {
                  return <br key={index} />;
                }
                return <p key={index} className="text-base leading-relaxed mb-4">{paragraph}</p>;
              })}
            </div>
          </CardContent>
        </Card>
        <FooterInfo />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-primary/20">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-4">
            <Icon name="Newspaper" size={32} className="text-white" />
          </div>
          <CardTitle className="text-2xl">Блог и новости</CardTitle>
          <CardDescription>
            Полезные советы и последние новости об аккумуляторах
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="gap-2"
          >
            <Icon name={category.icon as any} size={16} />
            {category.label}
          </Button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredPosts.map((post) => (
          <Card 
            key={post.id} 
            className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            onClick={() => setSelectedPost(post)}
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <Badge className={getCategoryColor(post.category)} variant="outline">
                  {post.category}
                </Badge>
              </div>
            </div>
            <CardHeader>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                <div className="flex items-center gap-1">
                  <Icon name="Calendar" size={12} />
                  {new Date(post.date).toLocaleDateString('ru-RU', { 
                    day: 'numeric',
                    month: 'short'
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Clock" size={12} />
                  {post.readTime} мин
                </div>
              </div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {post.title}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {post.excerpt}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                Читать далее
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <Card className="p-12">
          <div className="text-center space-y-4">
            <Icon name="FileText" size={64} className="mx-auto text-muted-foreground" />
            <div>
              <p className="text-xl font-semibold">Статей не найдено</p>
              <p className="text-muted-foreground mt-2">
                Попробуйте выбрать другую категорию
              </p>
            </div>
          </div>
        </Card>
      )}

      <FooterInfo />
    </div>
  );
};

export default BlogSection;

function Testimonials({ language }) {
  const testimonials = [
    {
      name: language === "ko" ? "김민지" : "Minji Kim",
      role: language === "ko" ? "요리 블로거" : "Food Blogger",
      image: "👩‍🍳",
      text:
        language === "ko"
          ? "다양한 레시피를 한 곳에서 찾을 수 있어서 너무 좋아요! 특히 랜덤 추천 기능이 새로운 요리에 도전하게 만들어줘요."
          : "I love finding various recipes in one place! The random recommendation feature especially encourages me to try new dishes.",
      rating: 5,
    },
    {
      name: language === "ko" ? "이준호" : "Junho Lee",
      role: language === "ko" ? "직장인" : "Office Worker",
      image: "👨‍💼",
      text:
        language === "ko"
          ? "퇴근 후 뭘 만들지 고민할 때 정말 유용해요. 재료별 검색 기능이 냉장고 파먹기에 최고입니다!"
          : "Really useful when wondering what to make after work. The ingredient search feature is perfect for using up fridge contents!",
      rating: 5,
    },
    {
      name: language === "ko" ? "박서연" : "Seoyeon Park",
      role: language === "ko" ? "주부" : "Homemaker",
      image: "👩‍🏫",
      text:
        language === "ko"
          ? "아이들 간식부터 가족 저녁 메뉴까지 모두 여기서 찾아요. 상세한 조리법과 영상이 있어서 초보자도 쉽게 따라할 수 있어요."
          : "I find everything from kids' snacks to family dinners here. Detailed instructions and videos make it easy even for beginners.",
      rating: 5,
    },
    {
      name: language === "ko" ? "최동욱" : "Dongwook Choi",
      role: language === "ko" ? "대학생" : "University Student",
      image: "👨‍🎓",
      text:
        language === "ko"
          ? "자취생에게 딱 필요한 서비스! 간단한 레시피부터 특별한 날 요리까지 다양하게 배울 수 있어요."
          : "Perfect service for students living alone! I can learn everything from simple recipes to special occasion dishes.",
      rating: 5,
    },
    {
      name: language === "ko" ? "정수민" : "Sumin Jung",
      role: language === "ko" ? "영양사" : "Nutritionist",
      image: "👩‍⚕️",
      text:
        language === "ko"
          ? "카테고리별로 잘 정리되어 있고, 세계 각국의 요리를 접할 수 있어서 좋습니다. 건강한 식단 계획에 도움이 많이 돼요."
          : "Well-organized by categories and great for exploring cuisines from around the world. Very helpful for healthy meal planning.",
      rating: 5,
    },
    {
      name: language === "ko" ? "강태현" : "Taehyun Kang",
      role: language === "ko" ? "요리 초보" : "Cooking Beginner",
      image: "👨‍🍳",
      text:
        language === "ko"
          ? "요리를 시작한 지 얼마 안 됐는데, 이 사이트 덕분에 자신감이 생겼어요. 단계별 설명이 정말 자세해서 실패가 없어요!"
          : "Just started cooking, and this site gave me confidence. The step-by-step instructions are so detailed that I never fail!",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-4">
            <span className="text-2xl">⭐</span>
            <span className="text-gold-600 font-medium">
              {language === "ko" ? "사용자 후기" : "User Reviews"}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {language === "ko"
              ? "사용자들의 생생한 후기"
              : "Real User Testimonials"}
          </h2>
          <p className="text-gray-600 text-lg">
            {language === "ko"
              ? "수많은 사용자들이 Recipe Cook과 함께 요리의 즐거움을 경험하고 있습니다"
              : "Thousands of users are experiencing the joy of cooking with Recipe Cook"}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gold-400/30"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">
                    ⭐
                  </span>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-wine-600 flex items-center justify-center text-2xl">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-bold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            {language === "ko"
              ? "당신도 Recipe Cook과 함께 요리 전문가가 되어보세요!"
              : "Become a cooking expert with Recipe Cook!"}
          </p>
          <div className="flex items-center justify-center gap-2 text-gold-600 font-semibold">
            <span className="text-3xl">⭐</span>
            <span className="text-2xl">4.9/5.0</span>
            <span className="text-gray-500">
              {language === "ko" ? "(10,000+ 리뷰)" : "(10,000+ Reviews)"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;

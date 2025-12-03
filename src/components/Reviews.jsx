import { useState, useEffect, useRef } from "react";

function Reviews({ language }) {
  const [userReviews, setUserReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [newReview, setNewReview] = useState({
    name: "",
    role: "",
    text: "",
    rating: 5,
  });
  const scrollContainerRef = useRef(null);

  const defaultTestimonials = [
    {
      name: language === "ko" ? "김민지" : "Minji Kim",
      role: language === "ko" ? "요리 블로거" : "Food Blogger",
      image: "👩‍🍳",
      text:
        language === "ko"
          ? "다양한 레시피를 한 곳에서 찾을 수 있어서 너무 좋아요! 특히 랜덤 추천 기능이 새로운 요리에 도전하게 만들어줘요."
          : "I love finding various recipes in one place! The random recommendation feature especially encourages me to try new dishes.",
      rating: 5,
      isDefault: true,
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
      isDefault: true,
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
      isDefault: true,
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
      isDefault: true,
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
      isDefault: true,
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
      isDefault: true,
    },
  ];

  const [allTestimonials, setAllTestimonials] = useState(defaultTestimonials);

  // Load user reviews from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("userReviews");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUserReviews(parsed);
        setAllTestimonials([...defaultTestimonials, ...parsed]);
      } catch (e) {
        console.error("Failed to load reviews:", e);
      }
    }
  }, []);

  // Auto-scroll animation
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollAmount = 0;
    const scrollSpeed = 0.5;

    const scroll = () => {
      scrollAmount += scrollSpeed;
      container.scrollLeft = scrollAmount;

      if (scrollAmount >= container.scrollWidth / 2) {
        scrollAmount = 0;
      }

      requestAnimationFrame(scroll);
    };

    const animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [allTestimonials]);

  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (!newReview.name || !newReview.role || !newReview.text) {
      alert(
        language === "ko"
          ? "모든 항목을 입력해주세요!"
          : "Please fill in all fields!"
      );
      return;
    }

    if (editingReview) {
      // 수정 모드
      const updatedUserReviews = userReviews.map((review) =>
        review.id === editingReview.id
          ? { ...newReview, image: "👤", id: editingReview.id }
          : review
      );
      setUserReviews(updatedUserReviews);
      setAllTestimonials([...defaultTestimonials, ...updatedUserReviews]);
      localStorage.setItem("userReviews", JSON.stringify(updatedUserReviews));
      alert(
        language === "ko"
          ? "리뷰가 수정되었습니다!"
          : "Review updated successfully!"
      );
      setEditingReview(null);
    } else {
      // 새 리뷰 추가
      const review = {
        ...newReview,
        image: "👤",
        id: Date.now(),
      };

      const updatedUserReviews = [review, ...userReviews];
      setUserReviews(updatedUserReviews);
      setAllTestimonials([...defaultTestimonials, ...updatedUserReviews]);
      localStorage.setItem("userReviews", JSON.stringify(updatedUserReviews));
      alert(
        language === "ko"
          ? "리뷰가 등록되었습니다!"
          : "Review submitted successfully!"
      );
    }

    setNewReview({
      name: "",
      role: "",
      text: "",
      rating: 5,
    });
    setShowReviewForm(false);
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setNewReview({
      name: review.name,
      role: review.role,
      text: review.text,
      rating: review.rating,
    });
    setShowReviewForm(true);
    setShowAllReviews(false);
  };

  const handleDeleteReview = (reviewId) => {
    if (
      !confirm(
        language === "ko"
          ? "정말 삭제하시겠습니까?"
          : "Are you sure you want to delete this review?"
      )
    ) {
      return;
    }

    const updatedUserReviews = userReviews.filter(
      (review) => review.id !== reviewId
    );
    setUserReviews(updatedUserReviews);
    setAllTestimonials([...defaultTestimonials, ...updatedUserReviews]);
    localStorage.setItem("userReviews", JSON.stringify(updatedUserReviews));
    alert(
      language === "ko"
        ? "리뷰가 삭제되었습니다!"
        : "Review deleted successfully!"
    );
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
    setNewReview({
      name: "",
      role: "",
      text: "",
      rating: 5,
    });
    setShowReviewForm(false);
  };

  const testimonialLoop = [...allTestimonials, ...allTestimonials];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
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
          <p className="text-gray-600 text-lg mb-6">
            {language === "ko"
              ? "수많은 사용자들이 Recipe Cook과 함께 요리의 즐거움을 경험하고 있습니다"
              : "Thousands of users are experiencing the joy of cooking with Recipe Cook"}
          </p>

          <button
            onClick={() => {
              setShowReviewForm(!showReviewForm);
              if (editingReview) {
                handleCancelEdit();
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 
                     text-white font-bold rounded-full text-sm
                     hover:from-gold-400 hover:to-gold-500 transition-all
                     shadow-lg shadow-gold-500/25"
          >
            <span className="text-xl">✍️</span>
            {language === "ko" ? "리뷰 작성하기" : "Write a Review"}
          </button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="max-w-2xl mx-auto mb-12 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {editingReview
                ? language === "ko"
                  ? "리뷰 수정"
                  : "Edit Review"
                : language === "ko"
                ? "리뷰 작성"
                : "Write Your Review"}
            </h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === "ko" ? "이름" : "Name"}
                </label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) =>
                    setNewReview({ ...newReview, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  placeholder={language === "ko" ? "홍길동" : "Your name"}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === "ko" ? "직업/역할" : "Role"}
                </label>
                <input
                  type="text"
                  value={newReview.role}
                  onChange={(e) =>
                    setNewReview({ ...newReview, role: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  placeholder={
                    language === "ko"
                      ? "직장인, 학생 등"
                      : "Student, Chef, etc."
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === "ko" ? "평점" : "Rating"}
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setNewReview({ ...newReview, rating: star })
                      }
                      className="text-2xl transition-transform hover:scale-110"
                    >
                      {star <= newReview.rating ? "⭐" : "☆"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === "ko" ? "후기 내용" : "Review"}
                </label>
                <textarea
                  value={newReview.text}
                  onChange={(e) =>
                    setNewReview({ ...newReview, text: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent h-32 resize-none"
                  placeholder={
                    language === "ko"
                      ? "Recipe Cook에 대한 솔직한 후기를 남겨주세요!"
                      : "Share your honest review about Recipe Cook!"
                  }
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 
                           text-white font-bold rounded-lg
                           hover:from-gold-400 hover:to-gold-500 transition-all"
                >
                  {editingReview
                    ? language === "ko"
                      ? "수정하기"
                      : "Update"
                    : language === "ko"
                    ? "등록하기"
                    : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg
                           hover:bg-gray-300 transition-all"
                >
                  {language === "ko" ? "취소" : "Cancel"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Auto-scrolling Carousel - 작은 카드 */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

          <div
            ref={scrollContainerRef}
            className="flex gap-3 overflow-x-hidden py-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonialLoop.map((testimonial, index) => (
              <div
                key={`${testimonial.id || index}-${index}`}
                className="min-w-[200px] bg-white rounded-xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gold-400/30 flex-shrink-0"
              >
                <div className="flex gap-0.5 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 text-xs mb-2 leading-relaxed line-clamp-2">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  <div>
                    <div className="font-bold text-gray-900 text-xs">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 전체 보기 버튼 */}
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAllReviews(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-full
                     hover:bg-gold-500/20 hover:text-gold-600 transition-all
                     border border-gray-200 hover:border-gold-500/30"
          >
            <span className="text-xl">📋</span>
            {language === "ko" ? "전체 리뷰 보기" : "View All Reviews"}
            <span className="text-sm">({allTestimonials.length})</span>
          </button>
        </div>

        {/* 전체 리뷰 모달 */}
        {showAllReviews && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowAllReviews(false)}
          >
            <div
              className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 모달 헤더 */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {language === "ko" ? "전체 리뷰" : "All Reviews"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === "ko" ? "총" : "Total"}{" "}
                    <span className="font-semibold text-gold-600">
                      {allTestimonials.length}
                    </span>
                    {language === "ko" ? "개의 리뷰" : " reviews"}
                  </p>
                </div>
                <button
                  onClick={() => setShowAllReviews(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
                >
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* 모달 컨텐츠 */}
              <div
                className="overflow-y-auto p-6"
                style={{ maxHeight: "calc(90vh - 80px)" }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {allTestimonials.map((testimonial, index) => (
                    <div
                      key={testimonial.id || index}
                      className="bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-all border border-gray-200 hover:border-gold-400/50 relative"
                    >
                      {/* 수정/삭제 버튼 (사용자가 작성한 리뷰만) */}
                      {!testimonial.isDefault && (
                        <div className="absolute top-1 right-1 flex gap-1">
                          <button
                            onClick={() => handleEditReview(testimonial)}
                            className="w-6 h-6 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-all"
                            title={language === "ko" ? "수정" : "Edit"}
                          >
                            <span className="text-xs">✏️</span>
                          </button>
                          <button
                            onClick={() => handleDeleteReview(testimonial.id)}
                            className="w-6 h-6 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-all"
                            title={language === "ko" ? "삭제" : "Delete"}
                          >
                            <span className="text-xs">🗑️</span>
                          </button>
                        </div>
                      )}

                      {/* 별점 */}
                      <div className="flex gap-0.5 mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-xs">
                            ⭐
                          </span>
                        ))}
                      </div>

                      {/* 리뷰 내용 */}
                      <p className="text-gray-700 text-xs mb-2 leading-relaxed line-clamp-3">
                        "{testimonial.text}"
                      </p>

                      {/* 사용자 정보 */}
                      <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                        <div>
                          <div className="font-bold text-gray-900 text-xs">
                            {testimonial.name}
                            {!testimonial.isDefault && (
                              <span className="ml-1 text-xs text-gold-600">
                                ({language === "ko" ? "내 리뷰" : "My Review"})
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

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
              {language === "ko"
                ? `(${10000 + allTestimonials.length}+ 리뷰)`
                : `(${10000 + allTestimonials.length}+ Reviews)`}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
